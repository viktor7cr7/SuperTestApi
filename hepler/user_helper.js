import supertest from 'supertest';

const request = supertest('https://gorest.co.in/public/v2');

const TOKEN = '2bfa75554c289d1f70a4a99a3744f64ce8b2ef822a75d33a40ba2e7071c60387'

export const createRandomUser = async () => {
    const userData = {
        "email": `test${Math.random() * 9999}@mail.com`,
        "name": "Test name",
        "gender": "male",
        "status": "inactive"
    };

    const res = await request.post('/users')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(userData)
    return res._body.id
}