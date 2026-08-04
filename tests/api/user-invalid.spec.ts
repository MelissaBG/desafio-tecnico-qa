import { test, expect } from '@playwright/test';
import { GitHubService } from './github-service';

test('GET /users/{inexistente} retorna 404', async ({ request }) => {
  const githubService = new GitHubService(request);

  const response = await githubService.getUser('usuario-que-nao-existe-123456789xyz');

  expect(response.status()).toBe(404);
});