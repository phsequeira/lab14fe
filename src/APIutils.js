import request from 'superagent';


const URL = 'https://shrouded-shore-88839.herokuapp.com';

export async function signUpUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
        .send({ email, password })

    return response.body;
}

export async function loginUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signin`)
        .send({ email, password })

    return response.body;
}

export async function searchCharacters(query) {
    const response = await request
        .get(`${URL}/characters?search=${query}`)

    return response.body;
}

export async function addFavorite(character, token) {
    const response = await request
        .post(`${URL}/api/favorites`)
        .set('Authorization', token)
        .send(character)

    return response.body;
}

export async function getFavorites(token) {
    const response = await request
        .get(`${URL}/api/favorites`)
        .set('Authorization', token);

    return response.body;
}

export async function removeFavorites(id, token) {
    const response = await request
    .delete(`${URL}/api/favorites/${id}`)
    .set('Authorization', token);

    return response.body;
}
