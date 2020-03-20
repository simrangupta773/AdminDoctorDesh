/**
 * About Us Page
 */
import React, { Component } from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
import { connect } from 'react-redux';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

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

// redux action
import {getMeditations,surveyUpdate,surveyDelete,surveyAdd} from '../../actions/AppActions';

import moment from 'moment';

class Meditation extends Component {
	constructor(props) {
		super(props)
		this.state={
			openForm:false,
			open:false,
			servey_id:'',
			addNewServey:{
				servey_title:'',
				servey_link:'',
			},
			errLink:'',
			upd_title:'',
			upd_link:''
		}
	
	  }

	  
	componentDidMount(){
                   
		this.props.getMeditations()
	}

	componentWillReceiveProps(next){

	}

	isForm = () =>{
		const {servey_link,servey_title} = this.state.addNewServey;
		return servey_link.length>0 && servey_title.length>0 && this.state.errLink=='';
	}

	isUrl =(url) =>{
		var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		if (!re.test(url)) { 
				return true;
		} else {
			return false;
		}
	}

	onChangeAddServey=(key,value)=>{
		var self=this;
     if(key=='servey_link') {
			 let url = this.isUrl(value);
			   url ? self.setState({errLink:'Please use valid link.'}) : self.setState({errLink:''})
		 }
		 self.setState({
		 addNewServey: {
			 ...this.state.addNewServey,
			 [key]: value
		 }
		})
	 }

	handleOpenedit = (data) => { 
		this.setState({upd_title:'',upd_link:'',servey_link:'',servey_title:'',addNewServey:{
			servey_title:data.servey_title,
			servey_link:data.servey_link
		}})

		if(data) {
			
		 this.setState({openForm:true,open:true,servey_id:data._id,upd_title:data.servey_title,upd_link:data.servey_link})

		}

	}

	

	

	updateServeySubmit=() => {
		
		const {servey_link,servey_title,servey_type} = this.state.addNewServey;
		
		let obj = {
			servey_title:servey_title,
                              servey_link:servey_link,
                              servey_type:2
		}
    if(this.state.servey_id && servey_title && servey_link) {
			this.props.surveyUpdate(obj, this.state.servey_id)
			this.setState({openForm:true,open:false,servey_id:'',upd_title:'',upd_link:''})
		 } else {
			this.props.surveyAdd(obj);
			this.setState({open:false,servey_id:'',upd_title:'',upd_link:''})
		 }
		
	}


	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		if(this.state.servey_id) {
			this.props.surveyDelete(this.state.servey_id);
			this.refs.deleteConfirmationDialog.close();
		}
	}

	handleClose = () => {
		this.setState({ open: false });
    };

	/**
	 * On Delete
	 */
	handleOpenDelete = (servey_id) => {
		if(servey_id) {
			this.refs.deleteConfirmationDialog.open();
			this.setState({ servey_id : servey_id });
		}
	
	}
		
	render() {
		 
		
		const columns = ["Survey Title", "Link", "Date & Time", "Action"];
		const data = [];
		const { open,addNewServey,upd_title,upd_link } = this.state;
		if(this.props.get_meditations!=null && this.props.get_meditations.length>0) {
			this.props.get_meditations.map((ro)=>{
				data.push(
					[ro.servey_title,
                     ro.servey_link,
					 moment(ro.createdAt).format('D MMMM YYYY HH:m'),
					 <div>
					 <IconButton className="text-default" aria-label="disabled Icon" onClick={this.handleOpenedit.bind(this,ro)}>
					   <i className="zmdi zmdi-edit"></i>
					 </IconButton>
					 <IconButton className="text-default" aria-label="disabled Icon" onClick={this.handleOpenDelete.bind(this,ro._id)}>
					   <i className="zmdi zmdi-delete"></i>
					 </IconButton>
				 </div>
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
				<PageTitleBar title={<IntlMessages id="sidebar.meditation_survey" />} match={this.props.match} />
				
				<div className="about-detail">

				<div className="pull-right" style={{marginTop:'13px', marginRight:'20px', position:'relative', 'z-index':'9'}}> 
					<Button variant="contained" color="primary" onClick={(e)=>this.setState({open:true})}> Add </Button> &nbsp;
				</div>  

					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Meditation Surveys list"}
								data={data}
								columns={columns}
								options={options}
							/>
						</RctCollapsibleCard>
					</RctCard>
					<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete survey permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
					           <Modal
                            isOpen={open}
                            toggle={() => this.handleClose()}
                        >
                            <ModalHeader toggle={() => this.handleClose()}>
							                   
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="File">Survey Title</Label>
                                    <Input type="text" name="servey_title" id="servey_title" placeholder="Survey Title" value={addNewServey.servey_title} onChange={(e)=>this.onChangeAddServey('servey_title',e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Link</Label>
                                    <Input type="text" name="link" id="link" placeholder="Survey Link (like https://www.example.com)" value={addNewServey.servey_link} onChange={(e)=>this.onChangeAddServey('servey_link',e.target.value)} />
																		<span style={{color:'red'}}>{this.state.errLink}</span>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
															
                                <Button variant="raised" className="btn-success text-white mr-10" disabled={!this.isForm()} onClick={(e)=>this.updateServeySubmit()}>Save</Button>
                                    <Button variant="raised" onClick={this.handleClose} className="btn-danger text-white mr-10">Cancel</Button>
                            </ModalFooter>
			            </Modal>

				</div>
			</div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,get_meditations,servey_update } = reducerApp;
	return {  loading,get_meditations,servey_update}
  }
  
  export default connect(mapStateToProps, {
	getMeditations,surveyUpdate,surveyDelete,surveyAdd
  })(Meditation);
