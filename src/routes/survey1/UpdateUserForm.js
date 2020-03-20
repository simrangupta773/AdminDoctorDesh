/**
 * Update User Details Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


const UpdateUserForm = ({ user, onUpdateUserDetail }) => (
    <Form>
        <FormGroup>
        <Label for="userName"> Survey Title</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Survey Title"
                value={user.name}
                onChange={(e) => onUpdateUserDetail('name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
        <Label for="userEmail">Link</Label>
            <Input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Link"
                value={user.emailAddress}
                onChange={(e) => onUpdateUserDetail('emailAddress', e.target.value)}
            />
        </FormGroup>
    </Form>
);

export default UpdateUserForm;
