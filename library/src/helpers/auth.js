import { deleteCookie, getCookie, setCookie } from "./cookies";
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "./localStorage"

export const setAuthentification =(user,token)=>{
    setLocalStorage('User',user); // bech t3abili data mte3 l user
    setCookie('token',token)
}

export const isAuthenticated =()=>{
    const cookie = getCookie('token');
    if(cookie && getLocalStorage('User')){
        return getLocalStorage('User')
    }else{
        return false
    }
}
export const logout = (next)=>{
    deleteCookie('token');
    deleteLocalStorage('user');
    next();
    }