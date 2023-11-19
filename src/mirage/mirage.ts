import { Model, Response, Registry, Server } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import { faker } from '@faker-js/faker';

type LoginData = {
  login: string;
  password: string;
}

export type UserData = {
  login: string;
  password: string;
  token: string;
};

const UserModel: ModelDefinition<UserData> = Model.extend({});

type AppRegistry = Registry<
  {
    user: typeof UserModel;
  }, NonNullable<unknown>
>;
type AppSchema = Schema<AppRegistry>;

const users = [
  {
    login: 'aaaaa@nail.ru',
    password: '12345',
    token: 'agfsdgasgsdagasg'
  },
  {
    login: 'bbbbb@nail.ru',
    password: '12345',
    token: 'fsdfsafasdfasffas'
  },
  {
    login: 'aaaaa@nail.ru',
    password: '12345',
    token: 'hfdghdfhdfhdfhhfd'
  },
  {
    login: 'aaaaa@nail.ru',
    password: '12345',
    token: 'yuiytiytiyiyitityi'
  }
];

export function initMirage() {
  return new Server({
    logging: true,
    models: {
      user: UserModel
    },

    routes() {
      this.post('/login', (schema: AppSchema, request) => {
        const loginData = JSON.parse(request.requestBody) as LoginData;
        const user = schema.findBy('user', {login: loginData.login, password: loginData.password});
        if (user) {
          return new Response(200, { 'user-login-token' : user.token }, { userName : user.login });
        }
        else {
          return new Response(200, {}, { error : 'Wrong user name or password' });
        }
      });
      this.get('/login', (schema: AppSchema, request) => {
        const token = request.requestHeaders['user-login-token'];
        const user = schema.findBy('user', { token });
        if (user) {
          return new Response(200, {}, { userName : user.login });
        }
        else {
          return new Response(401, {}, { error : 'You are not logged in or you do not have permission to this page' });
        }
      });
      this.post('/register', (schema: AppSchema, request) => {
        const loginData = JSON.parse(request.requestBody) as LoginData;
        const fakeToken = faker.string.alpha(17);
        schema.create('user', {login: loginData.login, password: loginData.password, token: fakeToken});
        return new Response(200, { 'user-login-token' : fakeToken }, { userName : loginData.login });
      });
    },

    seeds(server) {
      server.db.loadData({
        users: users
      });
    }
  });
}
