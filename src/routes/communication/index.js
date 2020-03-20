/**
 * About Us Page
 */
import React, { Component } from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { database } from './../../firebase/index';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import {getPages,getUserProfile,deleteCommunication} from '../../actions/AppActions';
// rct card box
import { RctCard } from 'Components/RctCard';

import Avatar from '@material-ui/core/Avatar';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

//import { connect } from 'http2';

import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	CardLink,
	CardGroup,
	CardImgOverlay,
Form,
FormGroup,
Label,
Input,
FormText,
Col,
	FormFeedback,
	Modal,
ModalHeader,
ModalBody,
ModalFooter
} from 'reactstrap';
import { useRef } from 'react';

const TestString = () => {
	return 'Test String Component'
}

class Communication extends Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			openForm:false,
			open:false,
			username: '',
			messagesAll:[],
			usersKey:{},
			receiver:'',
			userIds:[],	
            sender:'',
	  new_sorted:[],
	  communication_id:''
		  };
	  
		//this.viewName = this.viewName.bind(this);

	}
	
	handleOpenDelete = (userDetails) => {
		// if(patient_id) {
		// 	this.refs.deleteConfirmationDialog.open();
		// 	this.setState({ patient_id : patient_id });
		// }
		if(userDetails){
			this.setState({
				communication_id:userDetails
			});
			this.refs.deleteConfirmationDialog.open();
			// this.refs.deleteConfirmationDialog.close();
			// console.log(userDetails)
		}
		
	
	}


	deleteUserPermanently() { 
		// alert(this.state.communication_id)
		if(this.state.communication_id) {
			var id = this.state.communication_id;
			console.log(this.state.communication_id)
			var status = 0;
			const messagesRef = database.ref('messages').orderByKey();
			
			const userRef = database.ref('users').orderByKey();
			// /************************ */

			messagesRef.on('value', snapshot => { 
			
			
				var messagesNewArray = [];
				snapshot.forEach(function(childSnapshot) {
					// console.log()
					var childData = childSnapshot.val();
					var r
					for (let key in childData) {
						r=childData[key]
					}
					r.userDetails=childSnapshot.key
		      			if(childSnapshot.key == id){
						 console.log();
						var adaRef = database.ref('messages/'+id);
						adaRef.remove()
						
						.then(function() {
							console.log("Remove succeeded.")
							// status = 1;
						})
						const user = childSnapshot.key;
						const first_user  = user.split('-');
						// console.log(first_user);
						database.ref('users/'+first_user[0]+'/'+first_user[1]).remove();
						database.ref('users/'+first_user[1]+'/'+first_user[0]).remove();

						// const userRef = database.ref('users/').orderByKey();
						// userRef.on('value', snapshot => { 
						// 	snapshot.forEach(function(userSnapshot) {
						// 		console.log(userSnapshot);
						// 	});
						// });
						// .catch(function(error) {
						// 	console.log("Remove failed: " + error.message)
						// 	status = 0;
						// });
						//       alert("got it")
					      }
		  		});
			});
			
			
		}
			this.props.deleteCommunication(1)
			this.refs.deleteConfirmationDialog.close();
		
	}

	componentWillMount() {

		const messagesRef = database.ref('messages')
          .orderByKey();
			
		
			
			const userRef = database.ref('users')
		  .orderByKey();
			// console.log(userRef);
		//   .limitToLast(1000);
		 
		var messagesAll = [];
		let self = this;
		
		messagesRef.on('value', snapshot => { 
			
			
			var messagesNewArray = [];
			snapshot.forEach(function(childSnapshot) {
				// console.log()
				var childData = childSnapshot.val();
				var r
				for (let key in childData) {
					r=childData[key]
				}
				r.userDetails=childSnapshot.key
                messagesNewArray.push(r)
            });
            
            messagesNewArray.sort((a,b) => (b.messageTime  - a.messageTime));
            let messagesObj = snapshot.val();
			// console.log(messagesObj);
	    	this.setState({
				usersKey:messagesObj,
                userIds:Object.keys(messagesObj),
                new_sorted:messagesNewArray
			})
			// console.log(new_sorted);
		});


		
	}
		
	isUrl =(url) =>{
		var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		if (!re.test(url)) { 
				return true;
		} else {
			return false;
		}
	}
	

		viewConversations = (key) =>{
			
			this.setState({ open: true });
			let self=this;
		   
		  if(this.state.new_sorted && key) {
				let userIds = key.split('-');
                                        // console.log(key);
				let conversationList = Object.values(this.state.usersKey[key]);
				// console.log(conversationList);
				self.setState({
					messagesAll:conversationList,
					sender:userIds[0],
					receiver:userIds[1]
				})
				// console.log(conversationList);
        				
				var rebels = self.state.messagesAll.filter((val)=>{
					   if(val.from==userIds[1]) {
							 return val.senderName;
						 }
				})
				// console.log(conversationList);
			
				//this.setState({ open: false });
			}

			
	
		}


	viewName = (user_id,key) =>{
                var name
          //       console.log(Object.values(this.state.new_sorted[key]));
          //       console.log(user_id)
			this.state.new_sorted.filter((ro)=>{
				if(ro.from == user_id) {
                    // console.log("hello")
					return name = ro.senderName;
				} else {
					 //name = "";
				}
			
			})
			//console.log(name)
			return name
			}

			componentDidUpdate(prevProps,prevState){
				//this.props.getUserProfile("5cc818b4bcae4e601d67026")
			}

		
	
		


		loadthreads = () => {
			
			
			
			
			// var ts = new Date(1559674147387);
			// console.log((new Date(1559674147387)).toISOString())
			// return this.state.allthreads.map((a, i)=>
			// 	{ 
				if(this.state.messagesAll.length>0) {
					return this.state.messagesAll.reverse().map((ro)=>{
                        var dateVal ="/Date("+ro.messageTime+")/";
                        var date = new Date( parseFloat( dateVal.substr(6 )));
                             ro.messageTime = (date.getMonth() + 1) + "/" +
                            date.getDate() + "/" +
                            date.getFullYear() + " " +
                            date.getHours() + ":" +
                            date.getMinutes() + ":" +
                            date.getSeconds();
                        
						return (
                        
                        <div className=" chat-application">
									 
						<div className={this.state.sender==ro.from ? 'd-flex flex-nowrap flex-row-reverse mb-3':'d-flex flex-nowrap mb-3'}>
							<Avatar alt="user profile" src={require('Assets/avatars/user-15.jpg')} className="img-fluid rounded-circle ml-15 align-self-start" />
							<div className="chat-bubble-wrap">
					<span className="text-right d-block font-xs text-muted mt-">{ro.messageTime}</span>
								<div className={this.state.sender==ro.from ? 'chat-bubble odd bg-primary text-white':'chat-bubble even bg-aqua'}>
									<p className="mb-0">{ro.message} </p>
								</div>
								{ro.imageUrl ? <div className="mt-2 mb-2"> <a href={ro.imageUrl} download	>
								<img src={this.state.sender==ro.from ? ro.imageUrl:ro.imageUrl}
									alt="user profile" className="img-fluid mr-2" width="150"height="200"/></a>
								</div>:''}
								
								
							</div>
						</div>
			
					</div>
						)
			
					})
				} else {
					return (<div className=" chat-application">
									 
						<div >
						Record Not found.
						</div>
			
					</div>
						)
				}
			
		
				//});
		
			
		
		}

		handleClose = () => {
			this.setState({ open: false });
			};

	componentDidMount(){
		this.props.getPages();
		//this.props.getUserProfile("5cc818b4bcae4e601d67026")

	}


	render() {
              const {new_sorted} =this.state

		const columns = ["Sender Name", "Receiver Name", "View","Action"];
				
				const data = [];
				
        if(Object.keys(new_sorted)) {
		
                    Object.keys(new_sorted).forEach(key => 
                    //     console.log(new_sorted[key].recieverName)
				
						data.push([<div>
							<img src={require('Assets/avatars/user-15.jpg')}
							alt="user profile" className="img-fluid rounded-circle mr-2"
							width="50"height="100"/>
							{ new_sorted[key].senderName}
						</div>,
						 <div>
							<img src={require('Assets/avatars/user-15.jpg')}
							alt="user profile" className="img-fluid rounded-circle mr-2"
							width="50"height="100"/>
							{ new_sorted[key].recieverName}
						</div>, 
						<div>
							<button onClick={(e)=>this.viewConversations(new_sorted[key].userDetails)} className="btn btn-link view_details">View Details</button>
						</div>,
						<div className="action_provider">
							<IconButton className="text-default" aria-label="disabled Icon" onClick={this.handleOpenDelete.bind(this,new_sorted[key].userDetails)}>
						<i className="zmdi zmdi-delete"></i>
							</IconButton>
						</div>
							
					])
						
					 )
				} else {
					data.push(['Record Not found','',''])
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
				
			<div className="padding-13 messages-div">
            
       
        </div>                              
				<PageTitleBar title={<IntlMessages id="sidebar.communication" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						{data.length>0 ? 
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"User list"}
								data={data}
								columns={columns}
								options={options}
							/>
							
						</RctCollapsibleCard>
						:<div class="LoaderBalls">
						<div class="LoaderBalls__item"></div>
						<div class="LoaderBalls__item"></div>
						<div class="LoaderBalls__item"></div>
					</div> }
					</RctCard>
					<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete chat between the users permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
					<Modal
                            isOpen={this.state.open}
                            toggle={() => this.handleClose()}
                        >
                            <ModalHeader className="chat-wrapper" toggle={() => this.handleClose()}>
														
                            </ModalHeader>
                            <ModalBody className="chat-modal">
            {this.loadthreads()}
                         </ModalBody>
                            
			            </Modal>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({reducerApp}) =>{
	const {loading,get_profile} = reducerApp;
	return {loading,get_profile}
  }
  
  
  export default connect(mapStateToProps,{getPages,getUserProfile,deleteCommunication})(Communication);
