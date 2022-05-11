import { removeSession } from './_db';
import { parse, serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function get({ request }) {
    const cookies = parse(request.headers.get('cookie') || '');

    if (cookies.sessionId) {
        await removeSession(cookies.sessionId);
    }

    return {
        status: 200,
        headers: {
            'Set-Cookie': serialize('sessionId', '', {
                path: '/',
                expires: new Date(0),
            }),
        },
    };
}