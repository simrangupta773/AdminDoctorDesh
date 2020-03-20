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
import {getPatientDose,patchPatientDose,deletePatientDose,postPatientDose} from '../../actions/AppActions';

import moment from 'moment';

class Survey extends Component {
	constructor(props) {
		super(props)
		this.state={
			openForm:false,
			open:false,
			patient_id:'',
			patientDoseState:{
				patient_name:'',
				patient_dob:'',
				patient_location:'',
				name_of_medicine:'',
				dose_of_medicine:'',
				pharmacy_name:'',
				frequency_dose:'',
				pharmacy_fax_no:'',
				prn_text:'',
				pharmacy_phone_number:'',
				yourfaxNumber:'',
			},
			errLink:'',
			upd_title:'',
			upd_link:''
		}
	
	  }

	  
	componentDidMount(){
		this.props.getPatientDose()
	}

	componentWillReceiveProps(next){
    
	}

	isForm = () =>{
		const {patient_name,patient_dob,patient_location,name_of_medicine,dose_of_medicine,pharmacy_name,frequency_dose,pharmacy_fax_no,prn_text} = this.state.patientDoseState;
		return patient_name.length>0 && patient_dob.length>0 && patient_location.length>0 && name_of_medicine.length>0 && dose_of_medicine.length>0 && pharmacy_name.length>0 && frequency_dose.length>0 && pharmacy_fax_no.length>0;
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
			patientDoseState: {
			 ...this.state.patientDoseState,
			 [key]: value
		 }
		})
	 }

	handleOpenedit = (data) => { 
		
		this.setState({upd_title:'',upd_link:'',patientDoseState:{
			patient_name:data.patient_name,
			patient_dob:data.patient_dob,
			patient_location:data.patient_location,
			name_of_medicine:data.name_of_medicine,
			dose_of_medicine:data.dose_of_medicine,
			pharmacy_name:data.pharmacy_name,
			frequency_dose:data.frequency_dose,
			pharmacy_fax_no:data.pharmacy_fax_no,
			prn_text:data.prn_text,
			pharmacy_phone_number:data.pharmacy_phone_number,
			yourfaxNumber:data.yourfaxNumber,
		}})

		if(data) {
			
		 this.setState({openForm:true,open:true,patient_id:data._id})

		}

	}

	openFormAdd = () =>{
		this.setState({open:true,patient_id:'',patientDoseState:{
			patient_name:'',
			patient_dob:'',
			patient_location:'',
			name_of_medicine:'',
			dose_of_medicine:'',
			pharmacy_name:'',
			frequency_dose:'',
			pharmacy_fax_no:'',
			prn_text:'',
			pharmacy_phone_number:'',
			yourfaxNumber:'',
		}})

	}

	

	

	updateServeySubmit=() => {
		
		const {patient_name,patient_dob,patient_location,name_of_medicine,dose_of_medicine,pharmacy_name,frequency_dose,pharmacy_fax_no,prn_text} = this.state.patientDoseState;
		
	
    if(this.state.patient_id && patient_name && patient_location) {
			this.props.patchPatientDose(this.state.patientDoseState, this.state.patient_id)
			this.setState({openForm:true,open:false,patient_id:'',upd_title:'',upd_link:''})
		 } else {
			this.setState({patient_id:''})
			this.props.postPatientDose(this.state.patientDoseState);
			this.setState({open:false,patient_id:''})
		 }
		
	}


	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		if(this.state.patient_id) {
			this.props.deletePatientDose(this.state.patient_id);
			this.refs.deleteConfirmationDialog.close();
		}
	}

	handleClose = () => {
		this.setState({ open: false });
    };

	/**
	 * On Delete
	 */
	handleOpenDelete = (patient_id) => {
		if(patient_id) {
			this.refs.deleteConfirmationDialog.open();
			this.setState({ patient_id : patient_id });
		}
	
	}
		
	render() {
		 
		const columns = ["Name","Sender Name","Sender Phone No.", "DOB", "Location", "Medicine","Frequency Dose","Pharmacy Name","Pharmacy fax no","PRN","Pharmacy Phone","Your Fax","Created Date","Action"];
		const data = [];
		const { open,patientDoseState,patient_id } = this.state;
		if(this.props.get_dose!=null && this.props.get_dose.length>0) {
			this.props.get_dose.map((ro)=>{
				data.push(
					[ro.patient_name,
					ro.senderfirstName+" "+ro.senderlastName,
					ro.senderphoneNumber,
					ro.patient_dob,
					ro.patient_location, 
					ro.name_of_medicine,
					ro.dose_of_medicine,
					ro.pharmacy_name,
					ro.pharmacy_fax_no,
					ro.prn_text,
					ro.pharmacy_phone_number,
					ro.yourfaxNumber,
					moment(ro.createdAt).format('D MMMM YYYY HH:mm'),
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
				<PageTitleBar title={<IntlMessages id="sidebar.patientDose" />} match={this.props.match} />
				
				<div className="about-detail">

				<div className="pull-right" style={{marginTop:'13px', marginRight:'20px', position:'relative', 'z-index':'9'}}> 
					<Button variant="contained" color="primary" onClick={(e)=>this.openFormAdd()}> Add </Button> &nbsp;
				</div>  

					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Med Refill list"}
								data={data}
								columns={columns}
								options={options}
							/>
						</RctCollapsibleCard>
					</RctCard>
					<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete Med Refill permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
					           <Modal
                            isOpen={open}
                           
                        >
                            <ModalHeader toggle={() => this.handleClose()}>
							                   {patient_id ? 'Update Med Refill':'Add Med Refill'}
                            </ModalHeader>
                            <ModalBody className="provider-popup">
                                <FormGroup>
                                    <Label for="File">Patient Name</Label>
                                    <Input type="text" name="servey_title" id="servey_title" placeholder="Patient Name" value={patientDoseState.patient_name} onChange={(e)=>this.onChangeAddServey('patient_name',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Patient DOB</Label>
                                    <Input type="text" name="patient_dob" id="patient_dob" placeholder="Patient DOB" value={patientDoseState.patient_dob} onChange={(e)=>this.onChangeAddServey('patient_dob',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Patient Location</Label>
                                    <Input type="text" name="servey_title" id="servey_title" placeholder="Patient Location" value={patientDoseState.patient_location} onChange={(e)=>this.onChangeAddServey('patient_location',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Name of medicine</Label>
                                    <Input type="text" name="name_of_medicine" id="name_of_medicine" placeholder="Name of medicine" value={patientDoseState.name_of_medicine} onChange={(e)=>this.onChangeAddServey('name_of_medicine',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Dose of medicine</Label>
                                    <Input type="text" name="dose_of_medicine" id="dose_of_medicine" placeholder="Dose of medicine" value={patientDoseState.dose_of_medicine} onChange={(e)=>this.onChangeAddServey('dose_of_medicine',e.target.value)}/>
                                </FormGroup>
                                
																<FormGroup>
                                    <Label for="File">Is it prn</Label>
                                    <Input type="text" name="prn_text" id="prn_text" placeholder="Is it prn" value={patientDoseState.prn_text} onChange={(e)=>this.onChangeAddServey('prn_text',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Frequency dose</Label>
                                    <Input type="text" name="frequency_dose" id="frequency_dose" placeholder="Frequency dose" value={patientDoseState.frequency_dose} onChange={(e)=>this.onChangeAddServey('frequency_dose',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Pharmacy Name</Label>
                                    <Input type="text" name="pharmacy_name" id="pharmacy_name" placeholder="Pharmacy Name" value={patientDoseState.pharmacy_name} onChange={(e)=>this.onChangeAddServey('pharmacy_name',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Pharmacy fax No.</Label>
                                    <Input type="text" name="pharmacy_fax_no" id="pharmacy_fax_no" placeholder="Pharmacy fax no" value={patientDoseState.pharmacy_fax_no} onChange={(e)=>this.onChangeAddServey('pharmacy_fax_no',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Pharmacy Phone No.</Label>
                                    <Input type="text" name="pharmacy_phone_number" id="pharmacy_phone_number" placeholder="Pharmacy Phone No" value={patientDoseState.pharmacy_phone_number} onChange={(e)=>this.onChangeAddServey('pharmacy_phone_number',e.target.value)}/>
                                </FormGroup>

																<FormGroup>
                                    <Label for="File">Your fax No.</Label>
                                    <Input type="text" name="yourfaxNumber" id="yourfaxNumber" placeholder="Your fax No." value={patientDoseState.yourfaxNumber} onChange={(e)=>this.onChangeAddServey('yourfaxNumber',e.target.value)}/>
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
	const {  loading,get_dose,servey_update } = reducerApp;
	return {  loading,get_dose,servey_update}
  }
  
  export default connect(mapStateToProps, {
		getPatientDose,patchPatientDose,deletePatientDose,postPatientDose
  })(Survey);
