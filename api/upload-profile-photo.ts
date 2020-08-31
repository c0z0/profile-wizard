import { NowRequest, NowResponse } from '@vercel/node';
import multiparty from 'multiparty';
import fs from 'fs';

export default (req: NowRequest, res: NowResponse) => {
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
};
