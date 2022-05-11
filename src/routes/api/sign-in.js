import {createSession, getUserByEmail} from './_db';
import {serialize, parse} from 'cookie';
import * as cookie from "cookie";

export async function post({request}) {
    console.log('sign-in.post(' + request.method + ' ' + request.url + '): started')
    const {email, password} = await request.json();
    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
        return {
            status: 401,
            body: {
                message: 'Incorrect user or password',
            },
        };
    }

    console.log('sign-in.post(' + request.method + ' ' + request.url + '): correct username and password supplied')
    console.log('sign-in.post(' + request.method + ' ' + request.url + '): creating session')
    const {id} = await createSession(email);

    console.log('sign-in.post(' + request.method + ' ' + request.url + '): checking cookies')
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
                email,
            },
        },
    }


    if (cookies.redirectUrl) {

        console.log('sign-in.post(' + request.method + ' ' + request.url + '): cookie redirectUrl present')
        console.log('sign-in.post(' + request.method + ' ' + request.url + '): redirecting to ' + cookies.redirectUrl)

        response.status = 302
        response.headers.location = cookies.redirectUrl
        console.log('sign-in.post(' + request.method + ' ' + request.url + '): removing redirectUrl cookie')

        response.headers["Set-Cookie"].push(
            serialize('redirectUrl', '', {
                path: '/',
                expires: new Date(0),
            })
        )

    } else {
        console.log('sign-in.post(' + request.method + ' ' + request.url + '): cookie redirectUrl NOT present')
    }

    console.log('sign-in.post(' + request.method + ' ' + request.url + '): returning ' + JSON.stringify(response))
    return response;
}
