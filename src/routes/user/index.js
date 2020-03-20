/**
 * About Us Page
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge
} from 'reactstrap';


// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

// add new user form
// import AddNewUserForm from './AddNewUserForm';


import MUIDataTable from "mui-datatables";

// redux action
import {getUser,addContact,updContact_user,contactDelete_user,changeUserSatus,emailValidate} from '../../actions/AppActions';

import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';


import moment from 'moment';


class User extends Component {
	constructor(props) {
		super(props)
		this.state={
			openForm:false,
			profilePic:'',
			file:'',
			disabled:true,
			contact_id:'',
			providerstatus:4,
			upd_id:'',
			checkedEmail:'',
			addNewUserDetail: {
				id: '',
				lastName: '',
				firstName: '',
				avatar: '',
				designation:'',
				about: '',
				emailAddress: '',
				status: 'Active',
				lastSeen: '',
				accountType: '',
				badgeClass: 'badge-success',
				dateCreated: 'Just Now',
				checked: false,
				phoneNumber:'',
				password:'',
				provider_type:4,
				profileImg:'',
				type:''
			},
			isError: '',
			errfirstName: "",
			errlastName: "",
      errEmail: "",
      errAbout:"",
      errDesignation:"",
			errPassword:"",
			errPhoneNumber:"",
			errProvider_type:"",
			errProfilePic:"",
		}
		
		this.handleUploadFile = this.handleUploadFile.bind(this)
		this.onChangeAddNewUserDetails=this.onChangeAddNewUserDetails.bind(this)
		this.addNewUser = this.addNewUser.bind(this);
	  }

	  /**
	 * On Change Add New User Details
	 */
	onChangeAddNewUserDetails(key, value) {
		   if(key=='emailAddress') {
			   this.props.emailValidate(value)
		   }
		this.setState({
			addNewUserDetail: {
				...this.state.addNewUserDetail,
				[key]: value
			}
		});
		this.validate()

		
	}


	 

	/**
	 * View User Detail Hanlder
	 */



	handleUploadFile(event) {
	
	
		this.setState({file: URL.createObjectURL(event.target.files[0]),profilePic:event.target.files[0],errProfilePic:''})

   	
  }

  /**
	 * On Edit
	 */
	handleOpenEdit = (data) => {
		console.log(data)
	
		this.setState({openForm:true,profilePic:data.profilePicName,file:data.profilePic,upd_id:data._id,addNewUserDetail:{
			firstName:data.firstName,
			lastName:data.lastName,
			emailAddress:data.email,
			type:data.type,

			// about:data.about,
			// designation:data.specialist,
			provider_type:data.providerStatus,
			phoneNumber:data.phoneNumber,
			password:data.password
		}})
	}
		
	

	/**
	 * On Delete
	 */
	handleOpenDelete = (contact_id) => {
		if(contact_id) {
			this.refs.deleteConfirmationDialog.open();
			this.setState({ contact_id : contact_id });
		}
	
	}

	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		if(this.state.contact_id) {
			this.props.contactDelete_user(this.state.contact_id);
			this.refs.deleteConfirmationDialog.close();
		}
	}
          changeUserSatus(userId,type){
                    if(userId){
			let data = {
				userId:userId,
				type:type
			        }
                              this.props.changeUserSatus(data);
                    }
          }

	isFormAdd = () => {
		const { firstName,lastName, emailAddress,about,designation,password,phoneNumber,provider_type} = this.state.addNewUserDetail;
		
    
    		return firstName.length > 0  && lastName.length > 0  && emailAddress.length > 0  && password.length>0;
	}

	validate = () => {

		const { firstName,lastName, emailAddress,about,designation,password,phoneNumber,profileImg,provider_type} = this.state.addNewUserDetail;
		let isError = false;
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var mob = /^[+0-1]\d{11}$/;
		//var mob = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const errors = {
			errfirstName: "",
			errlastName: "",
      errEmail: "",
      errAbout:"",
      errDesignation:"",
			errPassword:"",
			errPhoneNumber:"",
			errProvider_type:"",
			errProfilePic:""
			
	};
	console.log(this.state.addNewUserDetail)
    if(!firstName)
    {
      isError = true;
      errors.errfirstName = "Please Enter First Name.";
	}
		
    if(!lastName)
    {
      isError = true;
      errors.errlastName = "Please Enter Last Name."
		}
		
    if(!emailAddress)
    {
      isError = true;
      errors.errEmail = "Please Enter Email Address.";
		}
		
//     if(!about)
//     {
//       isError = true;
//       errors.errAbout = "Please Write about something.";
// 		}
		
//     if(!designation)
//     {
//       isError = true;
//       errors.errDesignation = "Please Enter Designation.";
// 		}
// 		if(!password)
//     {
//       isError = true;
//       errors.errPassword = "Please Enter Password.";
// 		}

// 		if(!phoneNumber)
//     {
//       isError = true;
//       errors.errPhoneNumber = "Please Enter Phone Number.";
// 		}
	
// 	if(phoneNumber && mob.test(phoneNumber) == false)
//        {

//       isError = true;
//       errors.errPhoneNumber = "Please Enter Valid Phone Number.";
// 		}

		
	
	if(emailAddress && reg.test(emailAddress) == false)
    {
			isError = true;
      errors.errEmail = "Please Enter Valid Email address.";
	}

	
	if(!provider_type)
    {
      isError = true;
      errors.errProvider_type = "Please Select Provider type.";
	}

	
	
	if(!this.state.profilePic)
    {
      isError = true;
      errors.errProfilePic = "Please Select Profile Pic";
	} 

	if(this.state.checkedEmail)
    {
      isError = true;
      errors.errEmail = "Email id is Not Available.";
	} 


	

		
    this.setState(errors);
    return isError;
  };


		/**
	 * Add New User
	 */
	addNewUser(e) {
	
		e.preventDefault();
		
		let self = this;
		if(!this.validate()) {
	    const data = new FormData();
		const { firstName,lastName, emailAddress,about,designation,phoneNumber,password,provider_type,profileImg } = self.state.addNewUserDetail;
		
		if(firstName && lastName && emailAddress && password && provider_type) {
			data.append('firstName', firstName);
			data.append('lastName', lastName);
			data.append('email', emailAddress);
			data.append('about', about);
			data.append('phoneNumber', phoneNumber);
			data.append('password', password);
			data.append('type', 1);
			data.append('providerStatus', provider_type);
			data.append('userStatus', 1);
			data.append('specialist', designation);
			data.append('profilePic', self.state.profilePic);
			if(self.state.upd_id) { 
				self.props.updContact_user(self.state.upd_id,data)
				self.setState({openForm:false})
			} else { 
				self.props.addContact(data)
				self.setState({openForm:false})
			}
		
		} 
	} 
		
	}


	
	addForModel = () =>{
	
		this.setState({openForm:true,profilePic:'',file:'',upd_id:'',addNewUserDetail:{
			firstName:'',
			lastName:'',
			emailAddress:'',
			about:'',
			designation:'',
			provider_type:'',
			password:'',
			type:''
		}})
	}
	  
   componentDidMount(){
	 this.props.getUser()
	 }

   componentWillReceiveProps(next){
	   let self = this;
	     if(next.emailCheck) {
			self.setState({checkedEmail:true})
		 } else {
			self.setState({checkedEmail:false}) 
		 }
	 }

	 viewProvider =(type)=>{
		 if(type==1){
       return "Call"
		 } else if(type==2){
			return "Message"
		 } else if(type==3){
			return "Video"
		 } else if(type==4){
			return "All"
		 } else {
			return ""
		 }
		
		 
	 }
	 
		
	render() {
		const columns = ["Profile Image","User Name","Email","Phone Number", "Date & Time","Type", "Action"];
		const data = [];
		const { editUser } = this.state
		if(this.props.get_user!=null && this.props.get_user.length>0) {
			
			this.props.get_user.map((ro)=>{

				data.push(
					[
						<div className="media" >
						{ <img src={ro.profilePic == undefined?"https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png":ro.profilePic} onError={e => {
                  e.target.src = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";
                }} alt="user prof" class="rounded-circle mr-15" width="50" height="50"></img> }</div>,
						<div class="media-body"><h5 class="mb-5 fw-bold">{ro.firstName+' '+ro.lastName} </h5></div>,
						// <div className="specialist" >{ro.specialist}</div>,
						<div className="email" >{ro.email}</div>,
						<div className="phonNumber" >{ro.phoneNumber === "" ? "":ro.phoneNumber }</div>,
					//  <div className="about_content" >{ro.about}</div>,
					 <div className="created_date">{moment(ro.createdAt).format('D MMMM YYYY HH:mm')}</div>,
					 <div className="type" >
                                                   {(ro.type == 0) ?<Button variant="contained" onClick={(e)=>this.changeUserSatus(ro._id,ro.type)}  color="primary">Change to Staff Member</Button> : <Button variant="contained" onClick={(e)=>this.changeUserSatus(ro._id,ro.type)} color="secondary">Change to User Member</Button>}
                                                 </div>,
					 <div className="action_provider">
				 <IconButton className="text-default" aria-label="disabled Icon" onClick={(e)=>this.handleOpenEdit(ro)}>
					 <i className="zmdi zmdi-edit"></i>
				 </IconButton>
				  <IconButton className="text-default" aria-label="disabled Icon" onClick={this.handleOpenDelete.bind(this,ro._id)}>
					 <i className="zmdi zmdi-delete"></i>
				 </IconButton></div>
					]
			     )
			})
		} else {
			data.push(['No Record Found','','',''])
		}

	

		const options = {
			filterType: 'dropdown',
			filter:false,
			selectableRows: false,
			responsive: 'stacked',
			print:false,
			download:false,
			viewColumns:false,
			selectableRows: false,
			responsive: "scroll",
		};
		return (
			<div className="about-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.users_staff" />} match={this.props.match} />

				
				<div className="about-detail">

				{/* <div className="pull-right" style={{marginTop:'13px', marginRight:'20px'}}> 
					<Button variant="contained" color="primary" onClick={(e)=>this.addForModel()}> Add + </Button> &nbsp;
				</div>   */}

				<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete Contact permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
			        <MUIDataTable
								title={"Users list"}
								data={data}
								columns={columns}
								options={options}
							/>
							
							<Modal isOpen={this.state.openForm} >
					
				
					
       <Form onSubmit={this.addNewUser}>
			 <ModalBody className="provider-popup">
         <FormGroup>
            
		

            <Label for="File-2">Upload Image <span> * </span></Label>
			
						 <br/>
			{/* <img  src={require('Assets/img/user-1.jpg')} alt="profile-image" className="rounded-circle mb-15" width="100" height="100" /> */}
			<img src={this.state.file} onError={e => {
                  e.target.src = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";
                }} alt="user prof" class="rounded-circle mr-15" width="50" height="50"></img> 
			{/* <img src={this.state.file} alt="" className="rounded-circle mb-15" width="100" height="100" /> */}
						
						<br/>
            <Input type="file" name="profilePic" id="File-2" onChange={this.handleUploadFile} />
            <span style={{color:"red"}}>{this.state.errProfilePic}</span>
        </FormGroup>
        <FormGroup>
            <Label for="userName"> Provider First Name <span> * </span></Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="First Name"
                value={this.state.addNewUserDetail.firstName}
								onChange={(e) => this.onChangeAddNewUserDetails('firstName', e.target.value)}
            />
						<span style={{color:"red"}}>{this.state.errfirstName}</span>
        </FormGroup>
				<FormGroup>
            <Label for="userName"> Provider Last Name <span> * </span></Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Last Name"
                value={this.state.addNewUserDetail.lastName}
                onChange={(e) => this.onChangeAddNewUserDetails('lastName', e.target.value)}
            />
							<span style={{color:"red"}}>{this.state.errlastName}</span>
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Email Address <span> * </span></Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Email Address"
                value={this.state.addNewUserDetail.emailAddress}
                onChange={(e) => this.onChangeAddNewUserDetails('emailAddress', e.target.value)}
            />
							<span style={{color:"red"}}>{this.state.errEmail}</span>
        </FormGroup>
       {this.state.upd_id ? '':<FormGroup>
            <Label for="userEmail">Password <span> * </span></Label>
            <Input
                type={this.state.upd_id ? 'password':'text'}
                name="password"
                id="password"
                placeholder="Enter provider password"
                value={this.state.addNewUserDetail.password}
                onChange={(e) => this.onChangeAddNewUserDetails('password', e.target.value)}
            />
						<span style={{color:"red"}}>{this.state.errPassword}</span>
        </FormGroup>}
		

				<FormGroup>
            <Label for="userEmail">Phone Number <span> * </span></Label>
            <Input
                type="tel"
                name="phoneNumber"
				id="phoneNumber"
				min="10"
				max="15"
                placeholder="Enter Phone Number like (+19234567890)"
                value={this.state.addNewUserDetail.phoneNumber}
                onChange={(e) => this.onChangeAddNewUserDetails('phoneNumber', e.target.value)}
            />
						<span style={{color:"red"}}>{this.state.errPhoneNumber}</span>
        </FormGroup>

				{/* <FormGroup>
            <Label for="Designation">Designation <span> * </span></Label>
            <Input
                type="designation"
                name="designation"
                id="designation"
                placeholder="Enter Designation"
                value={this.state.addNewUserDetail.designation}
                onChange={(e) => this.onChangeAddNewUserDetails('designation', e.target.value)}
            />
						<span style={{color:"red"}}>{this.state.errDesignation}</span>
        </FormGroup>

        <FormGroup>
            <Label for="about">About <span> * </span></Label>
            <Input
             type="textarea" 
             name="text" 
             id="about" 
             placeholder="Write about something"
             value={this.state.addNewUserDetail.about}
             onChange={(e) => this.onChangeAddNewUserDetails('about', e.target.value)}
             />
						 <span style={{color:"red"}}>{this.state.errAbout}</span>
        </FormGroup> */}
	 {(this.state.addNewUserDetail.type == 2) ? <FormGroup>
            <Label for="about">Staff member Type <span> * </span></Label>
	 
				<Input value={this.state.addNewUserDetail.provider_type} type="select" onChange={(e) => this.onChangeAddNewUserDetails('provider_type', e.target.value)}>
				    <option value="">Select Staff member Status</option>
				    {/* <option value="4" >All</option> */}
						<option value="1">Call</option>
						<option value="2">Message</option>
						{/* <option value="3">Video</option> */}
						
				</Input>
				<span style={{color:"red"}}>{this.state.errProvider_type}</span>
        </FormGroup> : <FormGroup/>}
       
        
					
					<ModalFooter>
						
					    {/* <Button variant="raised" className="text-white btn-success" onClick={(e) => this.addNewUser(e)} disabled={!this.isFormAdd()}>Add</Button> */}
							<Button type="submit" variant="raised" className="btn-success text-white mr-10" style={{"text-transform":"capitalize"}} >Save</Button>
						<Button variant="raised" className="text-white btn-danger" onClick={(e)=>this.setState({openForm:false})} >Cancel</Button>
					</ModalFooter>
					</ModalBody>
					</Form>
				</Modal>
              
				</div>
			</div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,get_user,add_contact,emailCheck } = reducerApp;
	return {  loading,get_user,add_contact,emailCheck }
  }
  
  export default connect(mapStateToProps, {
	getUser,addContact,updContact_user,contactDelete_user,emailValidate,changeUserSatus
  })(User);
