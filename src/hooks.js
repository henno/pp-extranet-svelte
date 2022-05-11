import {getSession as getSessionFromApi} from './routes/api/_db';
import {parse, serialize} from "cookie";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {

    const responseJar = {status: 0, headers: [], cookies: []}

    // Helpers
    function loggingIn() {

        return event.url.pathname === '/sign-in' || event.url.pathname === '/api/sign-in' || event.url.pathname === '/api/sign-out';
    }

    function createCookie(cookieName, cookieValue = '', expires) {
        const cookie = {
            path: '/',
            httpOnly: true
        }
        if (expires) {
            console.log('expires: '+ expires)
            cookie.expires = expires
        }
        return serialize(cookieName, cookieValue, cookie);
    }

    function removeCookie(cookieName) {
        log('removing cookie ' + cookieName)
        writeCookie(createCookie(cookieName, '', new Date(0)))
    }

    function writeCookie(cookie) {
        log('pushing to cookies array cookie'+ JSON.stringify(cookie))
        responseJar.cookies.push(cookie);
    }

    function addCookie(cookieName, cookieValue) {
        log('adding cookie ' + cookieName + '=' + cookieValue)
        writeCookie(createCookie(cookieName, cookieValue))
    }

    function getSessionIdFromCookie() {
        log('getting sessionid from cookie')
        const cookies = parse(event.request.headers.get('cookie') || '');
        return cookies.sessionId
    }

    function deleteSessionIdCookie() {
        log('deleting session cookie')
        removeCookie('sessionId')
    }

    function addCookiesFromJar(headers) {

        responseJar.cookies.forEach(function (header) {
            headers.append('Set-Cookie', header)
        })
        return headers

    }

    function redirectToLogin() {
        log('redirecting to /sign-in')
        //return response.redirect(event.url.href.substring(0, event.url.href.length - event.url.pathname.length) + '/sign-in')
        responseJar.headers.push(['Location', '/sign-in'])
        responseJar.status = 302
        console.log(responseJar)

        // Create response
        let headers = new Headers(responseJar.headers);
        headers = addCookiesFromJar(headers)
        console.log(headers)
        return new Response('', {status: responseJar.status, headers})
    }

    function sessionIsExpired() {
        return !session;
    }

    function saveRedirectUrl() {
        if (loggingIn()) return
        log('saving ' + event.request.url + ' as redirectUrl')
        addCookie('redirectUrl', event.request.url)
    }

    function log(message) {
        console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): ' + message)
    }

    // Start here:
    if (loggingIn()) {
        log('logging in')
        deleteSessionIdCookie()
        return resolve(event);
    }

    const sessionId = getSessionIdFromCookie()
    log('sessionId=' + sessionId)

    if (!sessionId) {
        log('no session id')
        saveRedirectUrl()
        console.log('Here are request headers:')
        console.log(event.request.headers)
        //if(event.request.headers['content-type'])
        return redirectToLogin()
    }

    log('getting session data from db')
    const session = await getSessionFromApi(sessionId)

    if (sessionIsExpired()) {
        log('session is expired')
        saveRedirectUrl(responseJar)
        return redirectToLogin()

    }

    log('writing session data to locals')
    event.locals.user = session;

    log('processing page')
    return resolve(event);
}


/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event?.locals?.user
        ? {
            user: {
                email: event.locals.user.email,
            },
        }
        : {};
}
