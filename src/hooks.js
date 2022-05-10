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

import { getSession as getSessionFromApi } from './routes/api/_db';
import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = { email: session.email };
			return resolve(event);
		}
	} else if (event.url.pathname !== '/sign-in' && event.url.pathname !== '/api/sign-in' && event.url.pathname !== '/api/sign-out')
	{
		console.log('Handle' + event.url.pathname)
		const response = await resolve(event);
		response.headers.set(
			'set-cookie',
			cookie.serialize('redirectUrl', event.request.url, {
				path: '/'
			})
		);
		console.log(event.url.href.substring(0, event.url.href.length - event.url.pathname.length) + '/sign-in');
		console.log('hooks');
		return Response.redirect(event.url.href.substring(0, event.url.href.length - event.url.pathname.length) + '/sign-in');
	}

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