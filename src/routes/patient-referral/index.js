import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  FormGroup,
  Label,
	Input,
  CardBody,
  CardSubtitle, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import classnames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import { RctCard } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";

import { connect } from "react-redux";
import {
  getVideos,
  getVideos_for_general,
  addVideos,
  deleteVideo,
  updateVideos
} from "../../actions/AppActions";
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";

import {patienRefferel,deletePatientReferral} from '../../actions/AppActions';
import moment from 'moment';

class PatientReferral extends Component {
  constructor(props) {
    super(props);
//     super(props)
          this.state={
                    activeTab: "1",
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
  
toggle = el => {
          this.setState({ activeTab: el });
        };


  render() {
          const columns = ["Patient Name","Sender name","Phone number", "Facility Name and Room Number", "Refferal name and Phone number", "Reasons","PCP Image","Created Date","Action"];
          const data1 = [];
          const data2 = [];

          if(this.props.refferel!=null && this.props.refferel.length>0) {
                    this.props.refferel.forEach((ro)=>{
                              console.log(ro.refferal_type)
                              // if(ro.refferal_type===1){
                              //           console.log("hi")
                              // }else{
                              //           console.log("hello")
                              // }
                              if(ro.refferal_type==1){
                                        console.log(ro.refferal_type);
                                        data1.push(
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
                              }else
                              {
                                        data2.push(
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
                              }                              
                              
                     

                    })
          }else {
                    data1.push(['No Record Found','','',''])
                    data2.push(['No Record Found','','',''])

          }
          if(data1.length == 0){
                    data1.push(['No Record Found','','',''])

          }
          if(data2.length == 0){
                    data2.push(['No Record Found','','',''])
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
        
      <div>
          
        <Nav tabs>
            
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
                
                Nursing/Assisted
            </NavLink>
            
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Hospital/Outpatient Facility
            </NavLink>
            
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          

                {/* <h4>Tab 1 Contents</h4> */}
             {/* <Row> */}
             {/* {this.getVideoList()} */}

             <div className="about-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.patientReferral" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Patient list of nursing/assisted"}
								data={data1}
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
            {/* </Row> */}
          </TabPane>
          <TabPane tabId="2">
            {/* <Row>{this.getVideoList_for_general()}</Row> */}
            <div className="about-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.patientReferral" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Patient list hospital/outpatient facility"}
								data={data2}
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
          </TabPane>
        </TabContent>


       
      </div>

    );
  }
}

const mapStateToProps = ({ reducerApp }) => {
	const {  loading,refferel } = reducerApp;
	return {  loading,refferel }
  }
  
  export default connect(mapStateToProps, {
		patienRefferel,deletePatientReferral
  })(PatientReferral);