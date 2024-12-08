import React, { useState, useEffect } from 'react';
import useFetchFile from '../hooks/useFetchFile';

const Video = ({id}) =>{
    const {data, loading,  fetchData} = useFetchFile();
    const [file, setFile] = useState(null);
    if (id == `t`){
      id = `6235397-hd_1080_1920_25fps`;
    }
    useEffect(() =>{
        const fetchMovies = async () => {
            try{
              const url = `/films/v/${id}.mp4`;
              await fetchData(url);
            
            }catch(ex){
      
            }
          };

          fetchMovies();
          
    },[id]);

    useEffect(() => {
      if (data) {
        setFile(data);
      }
    }, [data]);
    
     if (file && file.url) {
      return (
          <div className="video-player">
              <video controls width="100%">
                  <source src={file.url} type="video/mp4" />
                  Ваш браузер не поддерживает воспроизведение видео.
              </video>
          </div>
      );
    }else{
      return <p>loading</p>
    }

}
export default Video