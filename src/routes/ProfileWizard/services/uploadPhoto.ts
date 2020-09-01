const uploadPhoto = async (photo: File) => {
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await fetch(
    // demo deployment of the serverless function
    'https://profile-wizard.vercel.app/api/upload-profile-photo',
    {
      method: 'POST',
      body: formData,
    },
  );

  const json = await res.json();

  if (!res.ok) throw new Error(json.err as string);

  return json.url as string;
};

export default uploadPhoto;
