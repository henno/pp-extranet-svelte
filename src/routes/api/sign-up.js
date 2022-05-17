import { createSession, getUserByUsername, registerUser } from './_db.js';
import { serialize } from 'cookie';

export async function post({ request }) {
    const { email, password } = await request.json();
    const user = await getUserByUsername(email);

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
        email,
        password,
    });

    const { id } = await createSession(email);
    return {
        status: 201,
        headers: {
            'Set-Cookie': serialize('sessionId', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // one week
            }),
        },
        body: {
            user: {
                email,
            },
        },
    };
}
