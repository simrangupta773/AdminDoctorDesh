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

// redux action
import {patienRefferel,deletePatientReferral} from '../../actions/AppActions';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import moment from 'moment';

class PatientReferral extends Component {
	constructor(props) {
		super(props)
		this.state={
			patient_id:''
		}
	
	  }

	  
		componentDidMount(){
			this.props.patienRefferel()
		}

		componentDidUpdate(prevProps, prevState) {
			// only update chart if the data has changed
			console.log(prevProps)
			console.log(prevState)
		  }
		  

	  /**
	 * On Delete
	 */
	handleOpenDelete = (patient_id) => {
		if(patient_id) {
			this.refs.deleteConfirmationDialog.open();
			this.setState({ patient_id : patient_id });
		}
	
	}

	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() { 
		if(this.state.patient_id) {
			this.props.deletePatientReferral(this.state.patient_id);
			this.refs.deleteConfirmationDialog.close();
		}
	}
		
	render() {
		 
		
		const columns = ["Patient Name","Sender name","Phone number", "Facility Name and Room Number", "Refferal name and Phone number", "Reasons","PCP Image","Created Date","Action"];
		const data = [];
		if(this.props.refferel!=null && this.props.refferel.length>0) {
			this.props.refferel.map((ro)=>{
				data.push(
					[ro.patient_name,
					 ro.senderfirstName+" "+ro.senderlastName,
                     			ro.senderphoneNumber,
                     			ro.facility_name,					 
					 ro.room_number,
					 ro.reason,
					 <div>
					 {ro.patient_image ? <IconButton className="text-default" aria-label="disabled Icon" >
					   <a href={ro.profilePic}><i className="zmdi zmdi-eye"></i></a>
					 </IconButton>:''}
				 </div>,
				  moment(ro.createdAt).format('D MMMM YYYY HH:mm'),
				  <div className="action_provider">
				  <IconButton className="text-default" aria-label="disabled Icon" onClick={this.handleOpenDelete.bind(this,ro._id)}>
					 <i className="zmdi zmdi-delete"></i>
				 </IconButton></div>
				  ] 
			 )
			 

			})
		}else {
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
				<PageTitleBar title={<IntlMessages id="sidebar.patientReferral" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Patient list"}
								data={data}
								columns={columns}
								options={options}
							/>
						</RctCollapsibleCard>
					</RctCard>
					<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete patient refferel permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
				</div>
			</div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,refferel } = reducerApp;
	return {  loading,refferel }
  }
  
  export default connect(mapStateToProps, {
		patienRefferel,deletePatientReferral
  })(PatientReferral);
