import {v4 as uuidv4} from 'uuid';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


let sessions: any = [];

export const getUserByUsername = async function (username: string) {
    const existingUser = await prisma.users.findUnique({
        where: {username: username}
    })
    if (!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
};

export const registerUser = async (user: any) => {
    async function userExists() {
        const existingUser = await prisma.users.findUnique({
            where: {
                username: user.username
            }
        })
        return existingUser;
    }

    const existingUser = await userExists();
    if (existingUser) return Promise.reject(new Error('User already exists'));
    return Promise.resolve(await prisma.users.create({
        data: user,
    }));
};

export const createSession = async (user: any) => {

    return Promise.resolve(await prisma.sessions.create({
        data: {
            id: uuidv4(),
            userId: user.id
        },
    }));
};

export const getSession = async (id) => {


    const session = await prisma.sessions.findUnique({
        where: {
            sessionId: id,
        },
    })
    if (!session) return Promise.resolve(null);
    return Promise.resolve(session);
};

export const removeSession = (id) => {
    const session = sessions.find((session) => session.id === id);
    if (!session) return Promise.reject(new Error('Session not found'));
    sessions = sessions.filter((session) => session.id !== id);
    return Promise.resolve(session);
};
