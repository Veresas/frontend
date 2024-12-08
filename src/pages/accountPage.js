import React, {useEffect, useState} from "react";
import { ChekAcess } from "../modules/chekAcces";
import useServerRequest from '../hooks/useServerRequest';
import { useParams } from 'react-router-dom';

const Account = () =>{
    const { id } = useParams();
    const [accessGranted, setAccessGranted] = useState(false);
    const {reqData, makeRequest } = useServerRequest();
    const [info, setInfo] = useState(null);
    
    useEffect (() => {
        const takeInfo = async () =>{
            await makeRequest(`/acc/info/${id}`, 'GET')
        }
        
        if(accessGranted === true && !reqData){
            takeInfo();
        } else if (reqData){
            setInfo(reqData);
        }

    }, [accessGranted, reqData])
    
    if (!accessGranted) {
        return <ChekAcess onAccessChecked={setAccessGranted} />;
    }

    if(info){
        return(
            <div>
                <h1>Личная страница</h1>
                <p>Имя: {info.name || 'Не указано'}</p>  {/* Обработка случая, когда info.name не существует */}
                <p>Почта: {info.email || 'Не указано'}</p> {/* Обработка случая, когда info.email не существует */}
                {/* Добавьте другие поля из info по необходимости */}
            </div>
        );
    }
    
}

export default Account