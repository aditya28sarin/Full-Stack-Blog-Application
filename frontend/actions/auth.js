import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie, { remove } from 'js-cookie';


export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your session is expired. Please signin'
                }
            });
        });
    }
};


export const signup = user => {
    return fetch(`${API}/signup`, {
        mode:'cors',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}



export const signin = user => {
    return fetch(`${API}/signin`, {
        mode:'cors',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


//the next which is being written this way at the end means that when we use this method in our front end
//this next becomes a callback fn, so the fns that normally take callbackfns in them, are actually defined like this behind the scenes
export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    //now we send request to our backend server
    return fetch(`${API}/signout`, {
        method: 'GET'
    }).then(response => {
        console.log('Signout Success!');
    }).catch(err => {
        console.log(err);
    })
}

//set the cookie
export const setCookie = (key, value) => {
    //to check if we are in the client side 
    if(process.browser){
        cookie.set(key,value, {
            expires: 1
        })
    }
}

//remove cookie
export const removeCookie = (key) => {
    if(process.browser){
        cookie.remove(key, {
            expires: 1
        })
    }
}

//get cookie
export const getCookie = (key) => {
    if(process.browser){
        return cookie.get(key)
    }
}

//local storage
export const setLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.setItem(key, JSON.stringify(value));
    }
}


export const removeLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.removeItem(key);
    }
}

//authenticate user by pass data to cookie and localstorage , this will be used in the signin component 
// once we signin we get the token and the user information, we will pass that info to this method that will use above methods

export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);

    next();
};

//this will return the current user from local storage if he/she exists 
export const isAuth = () => {
    if(process.browser){
        const cookieChecked = getCookie('token');

        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
}


export const loginWithGoogle = user => {
    return fetch(`${API}/google-login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};