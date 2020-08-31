const uploadPhoto = async (photo: File) => {
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await fetch('/api/upload-profile-photo', {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();

  return json.url as string;
};

export default uploadPhoto;
