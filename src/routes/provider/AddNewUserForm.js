/**
 * Add New User Form
 */

import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


const AddNewUserForm = ({ addNewUserDetails, onChangeAddNewUserDetails,handleUploadFile}) => (
    <Form  >
         <FormGroup>
            <img src={require('Assets/avatars/user-1.jpg')} alt="user prof" className="rounded-circle mb-15" width="100" height="100" />
            <br/>
            <Label for="File-2">Upload Image</Label>
            <Input type="file" name="profilePic" id="File-2" onChange={handleUploadFile} />
            
        </FormGroup>
        <FormGroup>
            <Label for="userName"> Doctor First Name</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="First Name"
                value={addNewUserDetails.firstName}
                onChange={(e) => onChangeAddNewUserDetails('firstName', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userName"> Doctor Last Name</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Last Name"
                value={addNewUserDetails.lastName}
                onChange={(e) => onChangeAddNewUserDetails('lastName', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Email Address</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Email Address"
                value={addNewUserDetails.emailAddress}
                onChange={(e) => onChangeAddNewUserDetails('emailAddress', e.target.value)}
            />
        </FormGroup>

        <FormGroup>
            <Label for="Designation">Designation</Label>
            <Input
                type="designation"
                name="designation"
                id="designation"
                placeholder="Enter Designation"
                value={addNewUserDetails.designation}
                onChange={(e) => onChangeAddNewUserDetails('designation', e.target.value)}
            />
        </FormGroup>

        <FormGroup>
            <Label for="about">About</Label>
            <Input
             type="textarea" 
             name="text" 
             id="about" 
             placeholder="Write about something"
             value={addNewUserDetails.about}
             onChange={(e) => onChangeAddNewUserDetails('about', e.target.value)}
             />
        </FormGroup>
       
    </Form>
);

export default AddNewUserForm;
