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
    background-color: #010b14;
    height: 100vh;
    width: 100vw;
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 0;
    left: 0;
`;

const FormContainer = styled.div`
    background-color: #170538;
    padding: 100px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const RegisterBtnContainer = styled.div`
    margin-top: 10px;
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

    const handleSwitch = () => {
        setRegister(!register);
    };

    return (
        <Container>
            <FormContainer>
                {
                    register ?
                        <Login />
                    :
                        <Register />
                }
                <RegisterBtnContainer>
                    <RegisterBtn onClick={handleSwitch}>{!register ? 'Login' : 'Register'}</RegisterBtn>
                </RegisterBtnContainer>  
            </FormContainer>    
        </Container>
    );
};

export default LoginPage;

