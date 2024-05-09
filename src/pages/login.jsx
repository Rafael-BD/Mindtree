import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../services/auth';
import { setToken } from '../redux/features/authTokenSlice';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from '../components/loginComponent';
import Register from '../components/registerComponent';

const Container = styled.div`
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const RegisterBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterBtn = styled.button`
    padding: 5px;
`;


const LoginPage = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.authToken);
    const [register, setRegister] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);


    return (
        <Container>
            {
                !register ?
                <>
                    <Login />
                    <RegisterBtnContainer>
                        <RegisterBtn onClick={() => setRegister(true)}>Registrar</RegisterBtn>
                    </RegisterBtnContainer>  
                </> 
                :
                <Register />
            } 
        </Container>
    );
};

export default LoginPage;

