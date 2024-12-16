import Cookies from 'js-cookie';

export function setCookie(name, value, options = {}) {
    const encodedValue = btoa(value);

    const defaultOptions = {
        expires: 1 / 24,
        secure: `${import.meta.env.VITE_APP_NODE_ENV}` === "production",
        sameSite: "Strict",
    };
    const finalOptions = { ...defaultOptions, ...options };

    Cookies.set(name, encodedValue, finalOptions);
}

export function getCookie(name) {
    const encodedValue = Cookies.get(name);
    if (encodedValue) {
        return atob(encodedValue); 
    }
    return null;
}

export function removeCookie(name, options = {}) {
    const defaultOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    };

    const finalOptions = { ...defaultOptions, ...options };
    Cookies.remove(name, finalOptions);
}
