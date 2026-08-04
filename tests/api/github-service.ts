import { APIRequestContext } from '@playwright/test';
export class GitHubService{
    constructor(private request: APIRequestContext){}

    async getUser(username: string){
        return this.request.get(`/users/${username}`);
    }
}