import Cookies from 'js-cookie';

const JWT_COOKIE_NAME = 'jwtToken';

export function setJwtInCookie(token, expirationDays = 7) {
    Cookies.set(JWT_COOKIE_NAME, token, { expires: expirationDays, secure: true, sameSite: 'Strict' });
}

export function getJwtFromCookie() {
    return Cookies.get(JWT_COOKIE_NAME);
}