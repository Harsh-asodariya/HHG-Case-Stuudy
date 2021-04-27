import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addEmployee } from '../../Api/Api';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';

function AddEmployee(props: { modalClosed: Function, rerender: Function }) {
    const initialEmployeeDetial = {
        name: '',
        email: '',
        position: ''
    }
    const [employeeDetail, setEmployeeDetail] = useState(initialEmployeeDetial)

    const [isLoading, setIsLoading] = useState(false)

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmployeeDetail({ ...employeeDetail, [event.target.name]: event.target.value })
    }

    const submitHandler = () => {
        setIsLoading(true)
        addEmployee(employeeDetail)
            .then(res => {
                setIsLoading(false)
                setEmployeeDetail(initialEmployeeDetial)
                alert('Employee added successfully')
                props.rerender()
                props.modalClosed()
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }

    const cancelHandler = () => {
        setEmployeeDetail(initialEmployeeDetial)
        props.modalClosed()
    }
    return (
        <>
            <BackDrop show={isLoading} ><Spinner /></BackDrop>
            <Form className='needs-validation'>
                <FormGroup>
                    <Label for="name">Employee Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Employee name" value={employeeDetail.name} onChange={onChangeHandler} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="firstname.lastname@bacancy.com" value={employeeDetail.email} onChange={onChangeHandler} required />
                </FormGroup>
                <FormGroup>
                    <Label for="position">Position</Label>
                    <Input type="text" name="position" id="position" placeholder="Employee designation" value={employeeDetail.position} onChange={onChangeHandler} required />
                </FormGroup>
                <Button color='primary' className='m-2' onClick={submitHandler}>Submit</Button>
                <Button color='danger' className='m-2' onClick={cancelHandler}>Cancel</Button>
            </Form>
        </>
    )
}

export default AddEmployee
