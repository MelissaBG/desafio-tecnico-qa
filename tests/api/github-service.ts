import { APIRequestContext } from '@playwright/test';
import { z } from 'zod';

export const GitHubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  public_repos: z.number(),
});

export class GitHubService {
  constructor(private request: APIRequestContext) {}

  async getUser(username: string) {
    return this.request.get(`/users/${username}`);
  }
}
