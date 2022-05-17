import {getUserByUsername} from '$lib/models/userModel';
import {createSession} from '$lib/models/sessionModel';
import {serialize, parse} from 'cookie';

import type { RequestHandler } from '@sveltejs/kit'
import type {RequestEvent} from "@sveltejs/kit/types/private";

// take a look what hides behind `ProductId` ;)



export const post: RequestEvent = async ({ request }) => {
    function log(message) {
        log('' + message)
    }

    log('started')
    const {username, password} = await request.json();
    const user = await getUserByUsername(username);
    if (!user || user.password !== password) {
        return {
            status: 401,
            body: {
                message: 'Incorrect user or password',
            },
        };
    }

    log('correct username and password supplied')
    log('creating session')

    const {id} = await createSession(user);

    log('checking cookies')
    const cookies = parse(request.headers.get('cookie') || '');

    const response = {
        status: 200,
        headers: {
            'Set-Cookie': [serialize('sessionId', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // one week
            })]
        },
        body: {
            user: {
                email: username,
            },
        },
    }


    if (cookies.redirectUrl) {

        log('cookie redirectUrl present')
        response.headers['Redirect-Url'] = cookies.redirectUrl

        response.headers['Set-Cookie'].push(serialize('redirectUrl', '', {
            path: '/',
            httpOnly: true,
            expires: new Date(0)
        }))

    } else {
        log('cookie redirectUrl NOT present')
    }

    log('returning ' + JSON.stringify(response))
    return response;
}
