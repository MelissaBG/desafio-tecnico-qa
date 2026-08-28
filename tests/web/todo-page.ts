import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoTitles: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
  }

  async goto() {
    await this.page.goto('');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.getByRole('checkbox').check();
  }

  async filterBy(filter: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name: filter }).click();
  }
}
