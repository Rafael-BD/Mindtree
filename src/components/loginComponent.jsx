//login component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../services/auth';
import { setToken } from '../redux/features/authTokenSlice';
import styled from 'styled-components';


const Container = styled.div`

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Input = styled.input`
    padding: 5px;
`;

const Button = styled.button`
    padding: 5px;
`;

const LoginWrongAlert = styled.div`
    color: red;
`;


const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [loginWrong, setLoginWrong] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await authenticate(login, senha).then((token) => token).catch((err) => {
            console.error(err);
            return false;
        });
        if (token) {
            console.log('token', token);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
        }
        else {
            setLoginWrong(true);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Button type="submit">Login</Button>
            </Form>
            {loginWrong && <LoginWrongAlert>Login ou senha incorretos</LoginWrongAlert>}
        </Container>
    );
};

export default Login