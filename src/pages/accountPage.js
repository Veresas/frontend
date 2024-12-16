import React, {useEffect, useState} from "react";
import { ChekAcess } from "../modules/chekAcces";
import useServerRequest from '../hooks/useServerRequest';
import { useParams } from 'react-router-dom';
import { removeCookie } from "../modules/Coookie";
import { useNavigate } from 'react-router-dom';
import MovieList from "../modules/MovieList";
import { getSomeCookie } from "../modules/Coookie";

const Account = () =>{
    const { id } = useParams();
    const [accessGranted, setAccessGranted] = useState(false);
    const {reqData, makeRequest } = useServerRequest();
    const [info, setInfo] = useState(null);
    const navigate = useNavigate();
    const [clik, setClik] = useState(null);
    const [addClik, setAddClik] = useState(null);

    useEffect (() => {
        const takeInfo = async () =>{
            await makeRequest(`/acc/${id}`, 'GET')
        }
        
        if(accessGranted === true && !reqData){
            takeInfo();
        } else if (reqData){
            setInfo(reqData);
        }

        if(clik){
            navigate("/log");
        }

        if(addClik){
            navigate("/addFilm/")
        }

    }, [accessGranted, reqData, clik, addClik])
    
    if (!accessGranted) {
        return <ChekAcess onAccessChecked={setAccessGranted} />;
    }
    const handleExitClick = () => {
        removeCookie("Username");
        removeCookie("jwtToken");
        setClik(true);
    };

    const handelAddFilmClik = () => {
        setAddClik(true);
    };

    if(info){
        return(
            <div>
                <h1>Личная страница</h1>
                <p>Имя: {info.name || 'Не указано'}</p>  
                <p>Почта: {info.email || 'Не указано'}</p> 
                <button onClick={handelAddFilmClik}>Добавить фильм</button>
                <button onClick={handleExitClick}>Выйти из аккаунта</button>
                <MovieList id={getSomeCookie("Username")} />
            </div>
        );
    }
    
}

export default Account