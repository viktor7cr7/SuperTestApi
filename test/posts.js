require('dotenv').config();
import request from '../config/common';
import {faker} from '@faker-js/faker';
import {expect} from 'chai';
import { createRandomUser } from '../hepler/user_helper';

const TOKEN = process.env.USER_TOKEN


describe('User Posts', () => {
    let postId, userId

    before(async() => {
      userId = await createRandomUser()
})

    it('/posts', async () => {
            const data = {
                "user_id": userId,
                "title": faker.lorem.sentence(),
                "body": faker.lorem.paragraphs()
              };

            const postres = await request
            .post('/posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
        
            console.log(postres._body)
            expect(postres._body).to.deep.include(data)
            postId = postres._body.id;

        })
    

    it('Get /posts/:id', async() => {
        await request
        .get(`/posts/${postId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(200)
    })

    describe('Negative test', () => {
        it('401 Authentication failed', async () => {
            const data = {
                "user_id": userId,
                "title": "Calamitas cito abeo collum labore.",
                "body": "Censura vos asperiores. Tactus celebrer tyrannus. Quos curiositas turbo. Nobis infit enim. Veritas textilis atque. Arx adduco clementia. Coaegresco tendo coniuratio. Summisse excepturi tenuis. Quod cupiditas annus. Speculum ancilla adopto. Mollitia apparatus cursim. Aliqua votum"
              };

            const postres = await request
            .post('/posts')
            .send(data);
            expect(postres.status).to.eq(401)
            expect(postres.text).to.eq('{"message":"Authentication failed"}')
        })

        it('422 Validation failed', async () => {
            const data = {
                "user_id": userId,
                "title": "Calamitas cito abeo collum labore.",
              };

            const postres = await request
            .post('/posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
            expect(postres.status).to.eq(422)
            expect(postres.text).to.eq(`[{"field":"body","message":"can't be blank"}]`)
        })
    })
})