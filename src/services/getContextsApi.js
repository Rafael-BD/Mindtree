/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

const api = 'http://localhost:3000/input'

const getContexts = async (contexts) => {
    const token = localStorage.getItem('token');

    // Formata o array de palavras contexts no formato: "context1,context2,context3"
    const body = {
        input: contexts.join(',')
    };

    const response = await axios.post(api, body, {
        headers: {
            'Authorization': `${token}`
        }
    });

    const formmatedRes = response.data.replace(/[{}]/g, '').split(',');

    return formmatedRes;

}

export default getContexts;
