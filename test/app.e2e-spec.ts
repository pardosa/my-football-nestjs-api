import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController e2e test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should authenticate jwt and load team data', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'hello', password: 'world' })
      .expect(201);

    const token = login.body.access_token;
    return request(app.getHttpServer())
      .get('/team/crud/34')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({
        id: 34,
        name: 'Newcastle',
        country: 'England',
        founded: 1892,
        national: false,
        logo: 'https://media.api-sports.io/football/teams/34.png',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
