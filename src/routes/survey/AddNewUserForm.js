/**
 * Add New User Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


const AddNewUserForm = ({ addNewUserDetails, onChangeAddNewUserDetails,}) => (
    <Form>
        <FormGroup>
            <Label for="userName"> Survey Title</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Survey Title"
                value={addNewUserDetails.name}
                onChange={(e) => onChangeAddNewUserDetails('name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Link</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Link"
                value={addNewUserDetails.emailAddress}
                onChange={(e) => onChangeAddNewUserDetails('emailAddress', e.target.value)}
            />
        </FormGroup>
       
    </Form>
);

export default AddNewUserForm;
