import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { getSomeCookie } from "../modules/Coookie";
const AcLair = () =>{
    
    const navigate = useNavigate();

    const name = getSomeCookie('Username');
    useEffect(() => {
        if(name === undefined){
            navigate('/log');
        }else{
            navigate(`/acc/${name}`);
        }
    }, [])

}

export default AcLair;