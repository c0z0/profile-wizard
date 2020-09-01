import { NowRequest, NowResponse } from '@vercel/node';
import multiparty from 'multiparty';
import fs from 'fs';

/**
 * Small serverless function for mocking a photo upload api. Returns the uploaded photo in base64 format,
 * whereas a real api would return a url to the uploaded photo
 *
 */

const allowCors = (fn) => async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors((req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    const form = new multiparty.Form();
    form.parse(req, (err, _, files) => {
      if (err) {
        return res.status(400).json({ err: 'Bad request' });
      }

      const { path, headers } = files.photo[0];

      try {
        res.json({
          url: `data:${headers['content-type']};base64, ${Buffer.from(
            fs.readFileSync(path),
          ).toString('base64')}`,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
      }
    });
    return;
  } else {
    res.writeHead(405, { 'content-type': 'text/plain' });
    res.end('Method not allowed. Send a POST request.');
    return;
  }
});
