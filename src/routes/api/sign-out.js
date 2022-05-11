import { removeSession } from './_db';
import { parse, serialize } from 'cookie';
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }) {

    const cookies = parse(request.headers.get('cookie') || '');

    if (cookies.sessionId) {
        try {
            await removeSession(cookies.sessionId);
        } catch (e) {
            if(e.message === 'Session not found'){
                return {
                    status: 404,
                    headers: {
                        'Set-Cookie': serialize('sessionId', '', {
                            path: '/',
                            expires: new Date(0),
                            httpOnly: true
                        }),
                    },
                    body: JSON.stringify({error: e.message})
                };
            }
            return {
                status: 500,
                body: JSON.stringify({error: e.message})
            };
        }
    }

    return {
        status: 204,
        headers: {
            'Set-Cookie': serialize('sessionId', '', {
                path: '/',
                expires: new Date(0),
                httpOnly: true
            }),
        },
    };
}
