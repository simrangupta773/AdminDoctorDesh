/**
 * Update User Details Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


const UpdateUserForm = ({ user, onUpdateUserDetail }) => (
    <Form>
         <FormGroup>
            <img src={user.avatar} alt="user prof" className="rounded-circle mb-15" width="100" height="100" />
            <Input type="file" name="file" id="File-2" />
        </FormGroup>
        <FormGroup>
        <Label for="userName"> Doctor Name</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Name"
                value={user.name}
                onChange={(e) => onUpdateUserDetail('name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
        <Label for="userEmail">Designation</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Email"
                value={user.emailAddress}
                onChange={(e) => onUpdateUserDetail('emailAddress', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userType">About</Label>
            <Input
                type="textarea"
                name="userType"
                id="userType"
                placeholder="Enter Type"
                value={user.type}
                onChange={(e) => onUpdateUserDetail('type', e.target.value)}
            />
        </FormGroup>
    </Form>
);

export default UpdateUserForm;
