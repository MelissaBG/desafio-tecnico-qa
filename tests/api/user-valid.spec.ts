import { test, expect } from '../fixtures';
import { GitHubUserSchema } from './github-service';

test('GET /users/octocat retorna 200 com campos esperados', async ({ githubService }) => {
  const response = await githubService.getUser('octocat');
  expect(response.status()).toBe(200);

  const body = await response.json();
  GitHubUserSchema.parse(body);
});
