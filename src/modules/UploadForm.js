import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../context/ApiContext';
import axios from 'axios';
import { getJwtFromCookie } from '../modules/Coookie';
const UploadForm = () => {
  const { register, handleSubmit } = useForm();
  
  const { baseUrl } = useApi();
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (photoFile) formData.append("photo", photoFile);
    if (videoFile) formData.append("video", videoFile);

    const jwtToken = getJwtFromCookie("jwtToken");

    
    axios.post(`${baseUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      console.log("Success:", response.data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Название:</label>
      <input type="text" id="title" {...register("title")}/>

      <label htmlFor="poster">Постер:</label>
      <input {...register("photo")} type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} />

      <label htmlFor="video">Фильм:</label>
      <input {...register("video")} type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
      
      <button type="submit">Upload All</button>
    </form>
  );
};

export default UploadForm;