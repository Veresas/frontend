import React from "react";
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import { getJwtFromCookie } from '../modules/Coookie';

const Acces = ({name}) =>{

    const { baseUrl } = useApi();
    const jwtToken = getJwtFromCookie("jwtToken");
    const navigate = useNavigate();
    const options = {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${jwtToken}`,
        },
      };
    const response = fetch(`${baseUrl}/chek`, options);
    if(response.ok){
        return navigate(`${name}`);
    }else{
        return navigate(`/log`);
    }

}

export default Acces