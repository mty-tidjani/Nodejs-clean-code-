

import validator from "../../service/validator";
import { THttpRequest, TInfractructure } from "src/domain/typings/types";
import { IUseCase } from "../../typings/interfaces";
import { Todo } from "../Entities/Todo";
import ITodoRepository from "../Port/ITodoRepository";


export default class CreateTodo implements IUseCase {

    constructor(private todoRepository: ITodoRepository) { }

    async execute({ body }: THttpRequest, _infra: TInfractructure): Promise<Todo | null> {

        this.validate(body);

        const todo = new Todo(body);

        return await this.todoRepository.create({
            id: 'xxxx',
            title: todo.title,
            description: todo.description,
            state: todo.state
        })
    }

    private validate(data: any) {
        
        if (!data) throw new Error('Data must be valid!');

        validator(data.title, 'Todo title').string().min(10).max(40).get()

        validator(data.description).string().min(10).get()

        if (!['pending', 'approved', 'done'].includes(data.state)) {
            throw new Error('Todo state shoul eigther be pending, approved or done')
        }
    }
}