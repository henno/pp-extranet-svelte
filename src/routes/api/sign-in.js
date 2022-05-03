import { createSession, getUserByEmail } from './_db';
import { serialize } from 'cookie';

export async function post({ request }) {
    const body = await request.json();
    const user = await getUserByEmail(body.email);

    // ⚠️ CAUTION: Do not store a plain passwords. Use proper hashing and salting.
    if (!user || user.password !== body.password) {
        return {
            status: 401,
            body: {
                message: 'Incorrect user or password',
            },
        };
    }

    const { id } = await createSession(body.email);
    return {
        status: 200,
        headers: {
            'Set-Cookie': serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // one week
            }),
        },
        body: {
            message: 'Successfully signed in',
        },
    };
}