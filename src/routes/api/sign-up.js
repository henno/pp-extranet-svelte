import { createSession, getUserByEmail, registerUser } from './_db';
import { serialize } from 'cookie';

export async function post({ request }) {
    const body = await request.json();
    const user = await getUserByEmail(body.email);

    if (user) {
        return {
            status: 409,
            body: {
                message: 'User already exists',
            },
        };
    }

    // ⚠️ CAUTION: Do not store a plain password like this. Use proper hashing and salting.
    await registerUser({
        email:body.email,
        password:body.password,
    });

    const { id } = await createSession(body.email);
    return {
        status: 201,
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
            message: 'Successfully signed up',
        },
    };
}