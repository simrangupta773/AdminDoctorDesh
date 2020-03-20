/**
 * About Us Page
 */
import React, { Component } from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

// redux action
import {patienRefferel,getNotification,sendToAllNotificatons} from '../../actions/AppActions';


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

import moment from 'moment';

class NotificationList extends Component {
	constructor(props) {
		super(props)
		this.state={
			open: false,
			sendNotification:{
				notification_title:'',
				notification_content:'',
			},
		}
	
	  }
	
		open(){
			this.setState({ open: true });
		}

		close() {
			this.setState({ close: false });
		}
	  
		componentDidMount(){
            this.props.patienRefferel()
            this.props.getNotification()
		}

	  componentWillReceiveProps(next){
	
		}

		onChangeAddServey=(key,value)=>{
			this.setState({
				sendNotification: {
				 ...this.state.sendNotification,
				 [key]: value
			 }
			})
		 }

		 isForm = () =>{
			const {notification_title,notification_content} = this.state.sendNotification;
			return notification_title.length>0 && notification_content.length>0;
		}

		handleClose = () => {
			this.setState({ open: false });
		};

		sendNotifications=() => {
			const {notification_title,notification_content} = this.state.sendNotification;
			let data = {
				title:notification_title,
				content:notification_content
			}

			this.props.sendToAllNotificatons(data)

			this.setState({ open: false });
			//NotificationManager.success('Notification Sent');
		}
		
	render() {
		const { children, heading, footerEnable } = this.props;
		const { open,sendNotification} = this.state;
		const columns = ["Title", "Content", "Created Date"];
		const data = [];
		if(this.props.notifications!=null && this.props.notifications.length>0) {
			this.props.notifications.map((ro)=>{
				data.push(
					[ro.title,
                     ro.content,
					 moment(ro.createdAt).format('D MMMM YYYY HH:mm'),
				  ] 
			 )
			 

			})
		}else {
			data.push(['No Record Found','',''])
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
				<PageTitleBar title={<IntlMessages id="sidebar.notificationList" />} match={this.props.match} />
				<div className="about-detail">
					<div className="pull-right" style={{marginTop:'13px', marginRight:'20px', position:'relative', 'z-index':'9'}}> 
						<Button variant="contained" color="primary" onClick={()=>this.open()} > send notification </Button>
					</div>  
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Notification list"}
								data={data}
								columns={columns}
								options={options}
							/>
						</RctCollapsibleCard>
					</RctCard>
				</div>
				<Modal
                            isOpen={open}
                            toggle={() => this.handleClose()}
                        >
                            <ModalHeader toggle={() => this.handleClose()}>
							                    Send to all Notification
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="File">Notification Title</Label>
                                    <Input type="text" name="notification_title" id="notification_title" placeholder="Notification Title" value={sendNotification.notification_title} onChange={(e)=>this.onChangeAddServey('notification_title',e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Notification Content</Label>
                                    <Input type="textarea" name="Content" id="Content" placeholder="Notification Content" value={sendNotification.notification_content} onChange={(e)=>this.onChangeAddServey('notification_content',e.target.value)} />
							

                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
															
                                <Button variant="raised" className="btn-success text-white mr-10" disabled={!this.isForm()} onClick={(e)=>this.sendNotifications()}>Save</Button>
                                    <Button variant="raised" onClick={this.handleClose} className="btn-danger text-white mr-10">Cancel</Button>
                            </ModalFooter>
			            </Modal>
			</div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,refferel,notifications } = reducerApp;
	return {  loading,refferel,notifications }
  }
  
  export default connect(mapStateToProps, {
		patienRefferel,getNotification,sendToAllNotificatons
  })(NotificationList);
