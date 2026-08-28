import { test as base } from '@playwright/test';
import { TodoPage } from './web/todo-page';
import { GitHubService } from './api/github-service';

type Fixtures = {
  todoPage: TodoPage;
  githubService: GitHubService;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },

  githubService: async ({ request }, use) => {
    const githubService = new GitHubService(request);
    await use(githubService);
  },
});

export { expect } from '@playwright/test';