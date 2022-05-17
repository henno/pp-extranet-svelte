import { createSession, getUserByUsername, registerUser } from '../../lib/models/userModel.ts';
import { serialize } from 'cookie';

export async function post({ request }) {
    const { email: username, password } = await request.json();
    const user = await getUserByUsername(username);

    if (user) {
        return {
            status: 409,
            body: {
                message: 'User already exists',
            },
        };
    }

    await registerUser({
        username,
        password,
    });

    const { id } = await createSession(username);
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
                email: username,
            },
        },
    };
}
