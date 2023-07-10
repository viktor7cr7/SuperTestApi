import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public/v2/users');

const TOKEN = '2bfa75554c289d1f70a4a99a3744f64ce8b2ef822a75d33a40ba2e7071c60387'

xdescribe('Users', () => {
    let userId;

    describe('POST', () => {
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
                userId = res._body.id;
            })
        })
    })

    describe('GET', () => {
        it ('/users', () => {
            return request.get(`?access-token=${TOKEN}`).then((res,err) => {
              expect(res._body).to.not.be.empty;
          });
      });
  
      it('/users/.id', () => {
          return request.get(`/${userId}?access-token=${TOKEN}`).then((res) => {
              expect(res._body.id).to.be.eq(userId);
    })
  })
})

  describe('PUT', () => {
    it('PUT /2070', () => {
        const data = {
            status: 'active',
            name: `Luffy - ${Math.random() * 9999}`
        }

        return request.put(`/${userId}`).set('Authorization', 
        `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
            expect(res._body).to.deep.include(data)
        })
    })
  })
    
  describe('DELETE', () => {
    it('DELETE /users:id', () => {
        return request
        .delete(`/${userId}`)
        .set('Authorization', 
        `Bearer ${TOKEN}`)
        .then(res => {
            expect(res._body).to.be.eq(undefined)
        })
    })
  })
});