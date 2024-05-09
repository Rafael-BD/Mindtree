import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../services/auth';
import { setToken } from '../redux/features/authTokenSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginBtn = styled.button`
    padding: 5px;
`;

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.authToken);

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            dispatch(setToken(localToken));
        }
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            navigate('/app'); // TODO: remover depois
        }
    }, [token, navigate]);

    return (
        <Container>
            <h1>Home</h1>
            <LoginBtn onClick={() => navigate('/login')}>Login</LoginBtn>
        </Container>
    );
};

export default Home
