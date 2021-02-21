import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (blog,token) => {
    return fetch(`${API}/blog`, {
        mode:'cors',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog,
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const listBlogsWithCategoriesAndTags = (blog,token) => {
    return fetch(`${API}/blogs-categories-tags`, {
        mode:'cors',
        method: 'POST', 
        headers: {
            Accept: 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}