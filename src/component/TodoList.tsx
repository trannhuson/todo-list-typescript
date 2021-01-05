import React from 'react';
import TodoItem from './TodoItem';

import { ITodoListProps } from './../todointerface/ITodo';

const TodoList = (props: ITodoListProps) => {
    
    const { isDisplayForm, todosList, onDelete, onEditTodo, onCheckbox } = props;

    return (
        <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-lg-12">
                <ul>
                    {
                        todosList.map((todo, index) => (
                            <TodoItem 
                                index={index}
                                key={`todo${todo.id}`}
                                isDisplayForm={isDisplayForm}
                                todo={todo}
                                onDelete={onDelete}
                                onEditTodo={onEditTodo}
                                onCheckbox={onCheckbox}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TodoList;