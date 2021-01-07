import React from 'react';
import axios from 'axios';
import * as Config from '../constants/Config';
import { ITodosList } from '../todointerface/ITodo'

const callApi = async (endpoint: any, method: any, body?: ITodosList) => {
    console.log( body)
    return await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

export default callApi;