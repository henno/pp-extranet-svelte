

export async function get({ request }) {
    console.log(request);
    console.log('test');

    return {
        status: 200,
        body: {
            user: {
                email: 'email'
            },
        },
    };
}