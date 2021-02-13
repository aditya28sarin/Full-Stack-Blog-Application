import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie, { remove } from 'js-cookie';


export const create = (category,token) => {
    return fetch(`${API}/category`, {
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

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        mode:'cors',
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const singleCategory = (slug) => {
    return fetch(`${API}/category/${slug}`, {
        mode:'cors',
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const removeCategory = (slug,token) => {
    return fetch(`${API}/category/${slug}`, {
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