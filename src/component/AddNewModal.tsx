import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { IAddNewModalProps } from './../todointerface/ITodo';

const AddNewModal = (props: IAddNewModalProps) => {

    const { onCloseForm, handleAddNewModal, editTodo } = props;

    const [dt, setDt] = useState<any>(moment());
    const [text, setText] = useState<string>('');
    const [status, setStatus] = useState<string>('Lower');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if(editTodo){
            setId(editTodo.id);
            setText(editTodo.text);
            setStatus(editTodo.status);
            setDt(editTodo.date);
        };
    }, [])

    useEffect(() => {
        if(editTodo){
            setId(editTodo.id);
            setText(editTodo.text);
            setStatus(editTodo.status);
            setDt(editTodo.date);
        }else {
            setId(0);
            setText('');
            setStatus('Lower');
            setDt(dt);
        }
    }, [editTodo])

    const handleCloseForm = () => {
        onCloseForm();
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        var datetime = '';
        if(editTodo){
            if(editTodo.date === dt) {
                datetime = dt;
            }else {
                datetime = dt.format('DD-MM-yyyy HH:mm');
            }
        }else {
            if((typeof dt) === 'string') {
                datetime = dt;
            }else {
                datetime = dt.format('DD-MM-yyyy HH:mm');
            }
        }
        
        handleAddNewModal({
            id: editTodo.id !== 0 ? editTodo.id : (new Date().valueOf()),
            text,
            isCompleted: editTodo ? editTodo.isCompleted : false,
            status,
            date: datetime
        });
       
        setText('');
        setStatus('Lower');
    }

    const onChangeStatus = (event: any) => {
        setStatus(event.target.value);
    }

    const handleCancle = () => {
        setText('');
        setStatus('Lower');
    }

    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
            <h3 className="panel-title">{ id !== 0 ? "Edit Todo List" : "Add Todo List" }</h3>
                <span 
                    className="fa fa-times-circle text-right"
                    onClick={ handleCloseForm }>
                </span>
            </div>
            <div className="panel-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Name :</label>
                        <input
                            required
                            value={text}
                            type="text" 
                            className="form-control"
                            onChange={ (e) => setText(e.target.value)} />
                    </div>
                    <label>Status</label>
                    <select 
                        value={status}
                        className="form-control" 
                        // required="required"
                        onChange={onChangeStatus}>
                            <option value="Lower">Lower</option>
                            <option value="Medium">Medium</option>
                            <option value="Hight">Hight</option>
                    </select>
                    <br/>
                    <label>Date</label>
                    <DatePicker
                        inputProps={{
                        style: { width: 325 }
                        }}
                        value={dt}
                        dateFormat="DD-MM-yyyy"
                        timeFormat="HH:mm"
                        onChange={val => setDt(val)}
                    /> <br />
                    {/* <div><b>Date:</b> {dt.format('DD-MM-YYYY hh:mm A')}</div> */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">{ id !== 0 ? "Edit" : "Add" }</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={handleCancle}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewModal;