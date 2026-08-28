import { test, expect } from '../fixtures';

test('GET /users/{inexistente} retorna 404', async ({ githubService }) => {
  const response = await githubService.getUser('usuario-que-nao-existe-123456789xyz');

  expect(response.status()).toBe(404);
});