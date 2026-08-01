import { test, expect } from '@playwright/test';
test('GET /users/{inexistente} retorna 404', async({request}) => {
    const response = await request.get('/users/usuario-que-nao-existe-123456789xyz');

    expect(response.status()).toBe(404);


});