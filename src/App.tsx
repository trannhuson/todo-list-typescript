import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import moment from 'moment';

import './App.css';
import AddNewModal from './component/AddNewModal';
import TodoList from './component/TodoList';
import Footer from './component/Footer';
import { ITodoListProps, ITodosList } from './todointerface/ITodo';
import callApi from './api/index';
import Header from './component/Header';

const App = () => {

    const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false);
    const [todosList, setTodosList] = useState<ITodosList[]>([]);
    const [taskEditing, setTaskEditing] = useState<ITodosList>({
          id: 0,
          text: '',
          isCompleted: false,
          status: 'Lower',
          date: moment().format('DD-MM-yyyy hh:mm'),
    });
    const [checkTimeLate, setCheckTimeLate] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('ALL');
    const [numberItem, setNumberItem] = useState<number>(todosList.length);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [textSearch, setTextSearch] = useState<string>('');
    const [action, setAction] = useState<boolean>(false);

    useEffect(() => {
      callApi('getTodosList', 'GET').then((res: any) => {
        setTodosList(res.data.data);
      })
    }, [action])

    useEffect(() => {
        setNumberItem(filterByStatus(todosList, status).length)
    })

    const onToggleForm = (todo: ITodosList) => {
        if(isDisplayForm && taskEditing !== null) {
            setIsDisplayForm(true);
        }else {
            setIsDisplayForm(!isDisplayForm);
        }
        setTaskEditing(todo);
    }

    const onCloseForm = () => {
        setIsDisplayForm(false)
    }

    const onShowForm = () => {
        setIsDisplayForm(true);
    }

    const checkIdExist = (id: number): boolean => {
        for(var i =  0; i < todosList.length; i++){
            if(todosList[i].id === id){
                return true;
            }
        }
        return false;
    }
    const handleAddNewModal = (todo: ITodosList) => {
        if(!checkIdExist(todo.id)) {
            callApi('add/list', 'POST', todo).then((res: any) => {
                // setTodosList(res.data.data);
                setAction(!action)
            })
        }else {
            callApi('update/list', 'PUT', todo).then((res: any) => {
            //    setTodosList(res.data.data);
                setAction(!action)
            })
        }    
        setTaskEditing({
          id: 0,
          text: '',
          isCompleted: false,
          status: todo.status,
          date: moment().format('DD-MM-yyyy HH:mm'),
        });  
    }

    const handleDelete = (id: number) => {
        // const array = todosList.filter(t => t.id !== id);
        const endpoint = 'delete/' + id;
        console.log("id: ", id);
         callApi(endpoint, 'DELETE').then((res: any) => {
            setAction(!action)
        })  
    }

    const handleEditTodo = (todo: ITodosList, index: number) => {
        var taskEditing = todosList[index];
        console.log("taskEditing: ", taskEditing);
        setTaskEditing(taskEditing);
        onShowForm();
    }

    const handleCheckbox = (id: number) => {
        const updateList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted}) : todo);
        setTodosList(updateList);
    }

    const setStatusFilter = (status: string) => {
        setStatus(status);
        if(status === 'ACTIVE') {
            var listActive = todosList.filter(todo => todo.isCompleted === false);
            setNumberItem(listActive.length);
        }
        if(status === 'COMPLETED') {
            var listCompleted = todosList.filter(todo => todo.isCompleted === true);
            setNumberItem(listCompleted.length);
        }
    }

    const filterByStatus = (todos: ITodosList[], status: string) => {
        switch (status) {
          case 'ACTIVE':
            return todos.filter((todo: ITodosList) => !todo.isCompleted);
            break;
          case 'COMPLETED':
           return  todos.filter((todo: ITodosList) => todo.isCompleted);
            break;
        case 'SEARCH':
            return todos.filter((todo: ITodosList) => todo.text.toLowerCase().includes(textSearch.toLowerCase()));
            break;
          default:
            return todos;
            break;
        }
    }

    const toggleShowAll = () => {
        setIsOpen(!isOpen);
    }

    const onSearch = (text: string, status: string) => {
        setTextSearch(text);
        setStatus(status);
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>Todos List</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                    { isDisplayForm ? <AddNewModal 
                                        handleAddNewModal={handleAddNewModal}
                                        onCloseForm={onCloseForm}
                                        editTodo={taskEditing}/> : ''}
                </div>
                <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                                'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <Header 
                            isOpen={isOpen}
                            isDisplayForm={isDisplayForm}
                            toggleShowAll={toggleShowAll}
                            onToggleForm={onToggleForm}
                            onSearch={onSearch}
                        />
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <CardBody>
                                <TodoList
                                    todosList={filterByStatus(todosList, status)}
                                    isDisplayForm={isDisplayForm}
                                    onDelete={handleDelete}
                                    onEditTodo={handleEditTodo}
                                    onCheckbox={handleCheckbox}
                                />
                            </CardBody>
                        </Card>
                    </Collapse>
                    <Footer 
                        isDisplayForm={isDisplayForm}
                        status={status}
                        numberItem={numberItem}
                        setStatusFilter={setStatusFilter}
                        isOpen={isOpen}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
