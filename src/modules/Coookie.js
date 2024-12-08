import Cookies from 'js-cookie';

const JWT_COOKIE_NAME = 'jwtToken';

export function setJwtInCookie(token, expirationDays = 1) {
    Cookies.set(JWT_COOKIE_NAME, token, { expires: expirationDays, secure: true, sameSite: 'Strict' });
}

export function getJwtFromCookie() {
    return Cookies.get(JWT_COOKIE_NAME);
}

export function setUsernameCookie(token, expirationDays = 1){
    Cookies.set("Username", token, {expires: expirationDays, secure: true, sameSite: "strict"})
}