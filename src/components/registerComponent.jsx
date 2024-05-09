import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, register } from '../services/auth';
import { setToken } from '../redux/features/authTokenSlice';
import styled from 'styled-components';


const Container = styled.div`
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 5px;
`;

const Button = styled.button`
    padding: 5px;
`;

const PassWrong = styled.div`
    color: red;
`;

const Register = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [passWrong, setPassWrong] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha !== confirmSenha) {
            setPassWrong(true);
            return;
        }
        const token = await register(login, senha).then((token) => token).catch((err) => {
            console.error(err);
            return false;
        });
        if (token) {
            console.log('token', token);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Input type="password" placeholder="Confirme a senha" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} />
                <Button type="submit">Register</Button>
            </Form>
            {passWrong && <PassWrong>Senha incorreta</PassWrong>}
        </Container>
    );
};

export default Register;


