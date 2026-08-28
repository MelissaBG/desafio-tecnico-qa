import { test, expect } from '../fixtures';

test('marca tarefa como concluída e valida filtros', async ({ todoPage }) => {
  await todoPage.addTodo('Tarefa A');
  await todoPage.addTodo('Tarefa B');

  await todoPage.completeTodo('Tarefa A');

  await todoPage.filterBy('Completed');
  await expect(todoPage.todoTitles).toHaveText(['Tarefa A']);

  await todoPage.filterBy('Active');
  await expect(todoPage.todoTitles).toHaveText(['Tarefa B']);
});