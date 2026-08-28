import { test, expect } from '../fixtures';
import { TodoPage } from './todo-page'; // ainda precisa? Vamos ver

test('adiciona duas tarefas e valida contador', async ({ todoPage }) => {
  await todoPage.addTodo('Comprar leite');
  await todoPage.addTodo('Estudar Playwright');

  await expect(todoPage.todoTitles).toHaveText([
    'Comprar leite',
    'Estudar Playwright',
  ]);
  await expect(todoPage.todoCount).toHaveText('2 items left');
});