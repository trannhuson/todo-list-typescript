import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ITodoItemProps, ITodosList } from './../todointerface/ITodo';

const TodoItem = (props: ITodoItemProps) => {

    const { isDisplayForm, index, todo, onDelete, onEditTodo, onCheckbox } = props;
    const [checkStatus, setCheckStatus] = useState<string>('');
    const [timeLate, setTimeLate] = useState<string>('');
    const [timeDeadline, setTimeDeadline] = useState<number>(new Date(moment(moment(todo.date).format('DD-MM-yyyy HH:mm')).toString()).getTime());
    const [today, setToday] = useState<number>(new Date().getTime() + 15 * 60 * 1000);

    useEffect(() => {
        var result = 'label label-primary ';
        if (todo.status === 'Medium') {
            result =  'label label-success ';
        }
        if (todo.status === 'Hight') {
            result = 'label label-danger ';
        }
        setCheckStatus(result);
    })

    useEffect(() => {
        var result = ''
        if(timeDeadline < today) {
            result = 'time-late';
        }
        setTimeLate(result);
    }, [])

    useEffect(() => {
        if(timeDeadline > today){
            setTimeout(function() {
                setTimeLate('time-late');
            }, timeDeadline - today);
        }
    }, [])

    const handleDelete = (id: number) => {
        const r = window.confirm("Do you want to delete: " + todo.text + " ?"); 
        if(r === true){
            onDelete(todo.id);
        }
    }

    const handleEditTodo = (td: ITodosList, idx: number) => {
        onEditTodo(td, idx);
    }
    
    const handleCheckbox = (id: number) => {
        onCheckbox(id);
    }

    return (
        <li className={`${isDisplayForm ? '' : 'displayform-true '} ${timeLate} ${todo.isCompleted ? '' : ' textDecoration'}`}>
            <input 
                className="input-chexbox"
                type="checkbox" 
                checked={todo.isCompleted}
                onClick={() => handleCheckbox(todo.id)}
                onChange={()=>{}}
                />
            <label className={`${todo.isCompleted ? 'content' : 'content textDecoration'}`}>
                <div className="Task__time">
                    <i className="far fa-calendar-alt"></i>&nbsp;
                    {todo.date}
                </div>
                <p className="text-todo">{todo.text}</p>
            </label>
            <span 
                className={`${checkStatus} ${ isDisplayForm ? 'span-display-form-true-status' : 'span-display-form-false-status'}`}
                >
                            <i className="bi bi-chevron-double-up">{todo.status}</i>
            </span>
            <button 
                type="button" 
                className={ isDisplayForm ? 'btn btn-warning btn-display-form-true-edit' : 'btn btn-warning btn-display-form-false-edit'}
                onClick={() => handleEditTodo(todo, index)}>
                    <span className="glyphicon glyphicon-pencil mr-5"></span> Edit
            </button>
            <button 
                type="button" 
                className={ isDisplayForm ? 'btn btn-danger btn-display-form-true-delete' : 'btn btn-danger btn-display-form-false-delete'}
                onClick={() => handleDelete(todo.id)}>
                     <span className="fa fa-trash mr-5"></span> Delete
            </button>
        </li>
    )
}

export default TodoItem;