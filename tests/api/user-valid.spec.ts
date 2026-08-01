import { test, expect } from '@playwright/test';
test('GET /users/octocat retorna 200 com campos esperados', async({request}) => {
    const response = await request.get('/users/octocat');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('login', 'octocat');
    expect(body).toHaveProperty('id');
     expect(body).toHaveProperty('public_repos');


});