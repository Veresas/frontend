import React from "react";
import Video from "../modules/Video";
import { useParams } from 'react-router-dom';

const FilmPage = () =>{
    const { id } = useParams();
    return(
        <div>
                <Video id={id} />
        </div>
    );
}

export default FilmPage