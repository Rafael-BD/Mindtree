/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/features/authTokenSlice';

const authenticate = async (login, senha) => {
    try {
        const response = await axios.post('http://localhost:3000/auth', { login, senha });
        const { token } = response.data;
        return token;

    } catch (error) {
        console.error(error);
        return false;
    }
};

const register = async (login, senha) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/register', { login, senha });
        const { token } = response.data;
        return token;

    } catch (error) {
        console.error(error);
        return false;
    }
};

const logout = () => {
    const dispatch = useDispatch()
    dispatch(removeToken());
    localStorage.removeItem('token');
};

export { authenticate, logout, register }