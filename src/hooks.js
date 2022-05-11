/*import { v4 as uuid } from '@lukeed/uuid';

import * as cookie from 'cookie';

/!** @type {import('@sveltejs/kit').Handle} *!/
export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || uuid();

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};*/

import {getSession as getSessionFromApi} from './routes/api/_db';
import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {


    console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): started')
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    if (cookies.sessionId) {
        console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): sessionId was present')
        const session = await getSessionFromApi(cookies.sessionId);
        if (session) {
            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): session is valid, adding user data to locals')
            event.locals.user = {email: session.email};
            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): returning resolved event')
            return resolve(event);
        } else {
            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): session is expired')

            // Create 302 /sign-in response
            const response = Response.redirect(event.url.href.substring(0, event.url.href.length - event.url.pathname.length) + '/sign-in');

            // Add an expired sessionId cookie to delete it from the browser
            console.log('Unsetting sessionId cookie')
            response.headers.set(
                'set-cookie', [
                    cookie.serialize('redirectUrl', event.request.url, {
                        path: '/'
                    }),
                    cookie.serialize('sessionId', '', {
                        path: '/',
                        expires: new Date(0),
                    })
                ]
            );

            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): redirecting to /sign-in')
            return response;

        }
    } else {
        console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): sessionId was NOT present')
        if (event.url.pathname !== '/sign-in' && event.url.pathname !== '/api/sign-in' && event.url.pathname !== '/api/sign-out') {
            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): not a sign-in path')
            const response = Response.redirect(event.url.href.substring(0, event.url.href.length - event.url.pathname.length) + '/sign-in');

            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): adding redirectUrl cookie to ' + event.request.url)
            response.headers.set(
                'set-cookie',
                cookie.serialize('redirectUrl', event.request.url, {
                    path: '/'
                })
            );

            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): redirecting to /sign-in')
            return response
        } else {
            console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): sign in path')
        }
    }

    console.log('hooks.handle(' + event.request.method + ' ' + event.url.pathname + '): processing event')
    event.locals.user = null;
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
