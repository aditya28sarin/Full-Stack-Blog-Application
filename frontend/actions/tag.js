import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie, { remove } from 'js-cookie';


export const create = (category,token) => {
    return fetch(`${API}/tag`, {
        mode:'cors',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getTags = () => {
    return fetch(`${API}/tags`, {
        mode:'cors',
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const singleTag = (slug) => {
    return fetch(`${API}/tag/${slug}`, {
        mode:'cors',
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const removeTag = (slug,token) => {
    return fetch(`${API}/tag/${slug}`, {
        mode:'cors',
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}