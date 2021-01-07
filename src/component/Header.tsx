import React, { useState } from 'react';
import moment from 'moment';
import { IHeaderProps } from '../todointerface/ITodo';

const Header = (props: IHeaderProps) => {

    const [text, setText] = useState('');
    const [status, setStatus] = useState('SEARCH');
    const { isDisplayForm, isOpen, toggleShowAll, onToggleForm, onSearch } = props;
    
    const handleToggleShowAll = (isOpen: boolean) => {
        toggleShowAll(!isOpen);
    }

    const handleOnToggleForm = () => {
        const taskEditing = {
            id: 0,
            text: '',
            isCompleted: false,
            status: 'Lower',
            date: moment().format('DD-MM-yyyy HH:mm')
        }
        onToggleForm(taskEditing)
    }

    const handleSearch = () => {
        onSearch(text, status);
    }

    return (
        <>
            <button 
                className={ isDisplayForm ? 'btn btn-primary inline-button' : 'btn btn-primary arror-colspan inline-button' } 
                onClick={ () => handleToggleShowAll(isOpen)}
                >
                    {isOpen ? <span className="glyphicon glyphicon-arrow-up"></span> : <span className="glyphicon glyphicon-arrow-down"></span> }
                    
            </button>
            <button 
                type="button"
                className={ isDisplayForm ? 'btn btn-primary inline-button' : 'btn btn-primary  btn-add-display-form-true inline-button'}
                onClick={ () => handleOnToggleForm() }>
                <span className="fa fa-plus mr-5"></span>Add New Task
            </button>
            <div className={ isDisplayForm ? 'form-inline-display-form-true my-2 my-lg-0 form-inline' : 'form-inline-display-form-false my-2 my-lg-0 form-inline'}>
                <input 
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    onChange={(e) => setText(e.target.value)}/>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}

export default Header;