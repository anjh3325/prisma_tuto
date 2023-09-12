import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prismaServie: PrismaService) {}

  // 전체 조회
  async fetchAllTodos(): Promise<Todo[]> {
    return this.prismaServie.todo.findMany();
  }

  // 단일 조회
  async fetchTodoItem(id: number): Promise<Todo | null> {
    return this.prismaServie.todo.findUnique({ where: { id: Number(id) } });
  }

  // 삭제
  async deleteTodoItem(id: number): Promise<Todo | null> {
    return this.prismaServie.todo.delete({ where: { id: Number(id) } });
  }

  // 추가
  async addTodoItem(data: Todo): Promise<Todo | null> {
    return this.prismaServie.todo.create({ data: data });
  }

  // 수정
  async updateTodoItem(
    id: number,
    title: string,
    content: string,
    isDone: boolean,
  ): Promise<Todo | null> {
    return this.prismaServie.todo.update({
      where: { id: Number(id) },
      data: { title: title, content: content, isDone: isDone },
    });
  }
}
