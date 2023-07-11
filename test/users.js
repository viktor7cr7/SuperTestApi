import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public/v2/users');

const TOKEN = '2bfa75554c289d1f70a4a99a3744f64ce8b2ef822a75d33a40ba2e7071c60387'

describe('Users', () => {
    it ('Get /users', () => {
/*         request.get(`?access-token=${TOKEN}`).end((err,res) => {
            expect(res._body).to.not.be.empty;
            done();
        }); */

        return request.get(`?access-token=${TOKEN}`).then((res,err) => {
            expect(res._body).to.not.be.empty;
        });
    });

    it('GET /users/.id', () => {
        return request.get(`/2060?access-token=${TOKEN}`).then((res) => {
            expect(res._body.id).to.be.eq(2060);
    })
})

    it('GET /users/users with query params', () => {

        const url = '&page=5&gender=female&status=active'

        return request.get(`?access-token=${TOKEN}${url}`).then((res) => {
            res._body.forEach(data => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');

            })
    })
})

    it('POST /users', () => {
        const data = {
            email: `test${Math.random() * 9999}@mail.com`,
            name: 'Test name',
            gender: 'male',
            status: 'inactive'
        };

        return request.post('/').set('Authorization', 
        `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            console.log(res)
            expect(res._body.email).to.eq(data.email);
            expect(res._body.status).to.eq(data.status);
            expect(res._body).to.deep.include(data)

        })
    })

    it('PUT /2070', () => {
        const data = {
            status: 'active',
            name: `Luffy - ${Math.random() * 9999}`
        }

        return request.put('/2070').set('Authorization', 
        `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
            console.log(res)
            expect(res._body).to.deep.include(data)
        })
    })

    it('DELETE /users:id', () => {
        return request
        .delete('/2070')
        .set('Authorization', 
        `Bearer ${TOKEN}`)
        .then(res => {
            expect(res._body).to.be.eq(null)
        })
    })
});