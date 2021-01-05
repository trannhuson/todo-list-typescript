import React from 'react';
import axios from 'axios';
import * as Config from '../constants/Config';
import { ITodosList } from '../todointerface/ITodo'

const callApi = (endpoint: any, method: any, body?: ITodosList) => {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

export default callApi;