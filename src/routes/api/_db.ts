import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


let sessions: any = [];

export const getUserByUsername = async function (username: string) {
    const existingUser = await prisma.users.findUnique({
        where:{username: username}
    })
    if (!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
};

export const registerUser = (user:any) => {

    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) return Promise.reject(new Error('User already exists'));
    users.push(user);
    return Promise.resolve(user);
};

export const createSession = async (user: ) => {

    const session = await prisma.sessions.create({
        data: {
            sessionId:
        },
    })


    const session = {
        id: uuidv4(),
        email,
    };
    sessions.push(session);
    return Promise.resolve(session);
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
