import { test, expect } from '@playwright/test';
import { GitHubService, GitHubUserSchema } from './github-service';
test('GET /users/octocat retorna 200 com campos esperados', async({request}) => {
    const githubService = new GitHubService(request);

    const response = await githubService.getUser('octocat');
    expect(response.status()).toBe(200);
    const body = await response.json();
    GitHubUserSchema.parse(body);


});