/**
 * User Management Page
 */
import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';

// api
import api from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// add new user form
import AddNewUserForm from './AddNewUserForm';

// update user form
import UpdateUserForm from './UpdateUserForm';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

// import { Button,Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { MDBDataTable} from 'mdbreact';

// redux action
import {getContact} from '../../actions/AppActions';


class Provider extends Component {

	state = {
		all: false,
		users: null, // initial user data
		selectedUser: null, // selected user to perform operations
		loading: false, // loading activity
		addNewUserModal: false, // add new user form modal
		addNewUserDetail: {
			id: '',
			name: '',
			avatar: '',
			type: '',
			emailAddress: '',
			status: 'Active',
			lastSeen: '',
			accountType: '',
			badgeClass: 'badge-success',
			dateCreated: 'Just Now',
			checked: false
		},
		openViewUserDialog: false, // view user dialog box
		editUser: null,
		allSelected: false,
		selectedUsers: 0
	}

	componentDidMount() {
		
		api.get('userManagement.js')
			.then((response) => {
				this.setState({ users: response.data });
			})
			.catch(error => {
				// error hanlding
			})
	}

	/**
	 * On Delete
	 */
	onDelete(data) {
		this.refs.deleteConfirmationDialog.open();
		this.setState({ selectedUser: data });
	}

	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		const { selectedUser } = this.state;
		let users = this.state.users;
		let indexOfDeleteUser = users.indexOf(selectedUser);
		users.splice(indexOfDeleteUser, 1);
		this.refs.deleteConfirmationDialog.close();
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ loading: false, users, selectedUser: null });
			NotificationManager.success('User Deleted!');
		}, 2000);
	}

	/**
	 * Open Add New User Modal
	 */
	opnAddNewUserModal() {
		this.setState({ addNewUserModal: true });
	}

	/**
	 * On Reload
	 */
	onReload() {
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ loading: false });
		}, 2000);
	}

	/**
	 * On Select User
	 */
	onSelectUser(user) {
		user.checked = !user.checked;
		let selectedUsers = 0;
		let users = this.state.users.map(userData => {
			if (userData.checked) {
				selectedUsers++;
			}
			if (userData.id === user.id) {
				if (userData.checked) {
					selectedUsers++;
				}
				return user;
			} else {
				return userData;
			}
		});
		this.setState({ users, selectedUsers });
	}

	/**
	 * On Change Add New User Details
	 */
	onChangeAddNewUserDetails(key, value) {
		this.setState({
			addNewUserDetail: {
				...this.state.addNewUserDetail,
				[key]: value
			}
		});
	}

	/**
	 * Add New User
	 */
	addNewUser() {
		const { name, emailAddress } = this.state.addNewUserDetail;
		if (name !== '' && emailAddress !== '') {
			let users = this.state.users;
			let newUser = {
				...this.state.addNewUserDetail,
				id: new Date().getTime()
			}
			users.push(newUser);
			this.setState({ addNewUserModal: false, loading: true });
			let self = this;
			setTimeout(() => {
				self.setState({ loading: false, users });
				NotificationManager.success('User Created!');
			}, 2000);
		}
	}

	/**
	 * View User Detail Hanlder
	 */
	

	/**
	 * On Edit User
	 */
	onEditUser(user) {
		this.setState({ addNewUserModal: true, editUser: user });
	}

	/**
	 * On Add & Update User Modal Close
	 */
	onAddUpdateUserModalClose() {
		this.setState({ addNewUserModal: false, editUser: null })
	}

	/**
	 * On Update User Details
	 */
	onUpdateUserDetails(key, value) {
		this.setState({
			editUser: {
				...this.state.editUser,
				[key]: value
			}
		});
	}

	/**
	 * Update User
	 */
	updateUser() {
		const { editUser } = this.state;
		let indexOfUpdateUser = '';
		let users = this.state.users;
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (user.id === editUser.id) {
				indexOfUpdateUser = i
			}
		}
		users[indexOfUpdateUser] = editUser;
		this.setState({ loading: true, editUser: null, addNewUserModal: false });
		let self = this;
		setTimeout(() => {
			self.setState({ users, loading: false });
			NotificationManager.success('User Updated!');
		}, 2000);
	}

	//Select All user
	onSelectAllUser(e) {
		const { selectedUsers, users } = this.state;
		let selectAll = selectedUsers < users.length;
		if (selectAll) {
			let selectAllUsers = users.map(user => {
				user.checked = true
				return user
			});
			this.setState({ users: selectAllUsers, selectedUsers: selectAllUsers.length })
		} else {
			let unselectedUsers = users.map(user => {
				user.checked = false
				return user;
			});
			this.setState({ selectedUsers: 0, users: unselectedUsers });
		}
	}

	render() {
		const { users, loading, selectedUser, editUser, allSelected, selectedUsers } = this.state;
		return (
			<div className="user-management">
				<PageTitleBar
					title={<IntlMessages id="sidebar.provider" />}
					match={this.props.match}
				/>
				<RctCollapsibleCard fullBlock>
					<div className="table-responsive">
						<div className="d-flex justify-content-between py-20 px-10 border-bottom">
							<div className="ml-10">
								<h2 className="mb-0">Provider List</h2>
							</div>
							<div>
								<a href="javascript:void(0)" onClick={() => this.opnAddNewUserModal()} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
							</div>
						</div>
						<table className="table table-middle table-hover mb-0">
							<thead>
								<tr>
									<th>Doctor Name</th>
									<th>Designation</th>
									<th>About</th>
									<th>Date & Time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{users && users.map((user, key) => (
									<tr key={key}>
										<td>
											<div className="media">
												{user.avatar !== '' ?
													<img src={user.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
													: <Avatar className="mr-15">{user.name.charAt(0)}</Avatar>
												}
												<div className="media-body">
													<h5 className="mb-5 fw-bold">{user.name}</h5>
												</div>
											</div>
										</td>
										<td>{user.emailAddress}</td>
										<td>This is a dummy text</td>
										<td>10th March 2018, 10AM</td>
										<td className="list-action">
											<a href="javascript:void(0)" onClick={() => this.onEditUser(user)}><i className="ti-pencil"></i></a>
											<a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a>
										</td>
									</tr>
								))}
							</tbody>
							<tfoot className="border-top">
								<tr>
									<td colSpan="100%">
										<Pagination className="mb-0 py-10 px-10">
											<PaginationItem>
												<PaginationLink previous href="#" />
											</PaginationItem>
											<PaginationItem active>
												<PaginationLink href="javascript:void(0)">1</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="javascript:void(0)">2</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="javascript:void(0)">3</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink next href="javascript:void(0)" />
											</PaginationItem>
										</Pagination>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					{loading &&
						<RctSectionLoader />
					}
				</RctCollapsibleCard>
				<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete user permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
				<Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
					<ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
						{editUser === null ?
							'Add New Provider' : 'Update Provider'
						}
					</ModalHeader>
					<ModalBody>
						{editUser === null ?
							<AddNewUserForm
								addNewUserDetails={this.state.addNewUserDetail}
								onChangeAddNewUserDetails={this.onChangeAddNewUserDetails.bind(this)}
							/>
							: <UpdateUserForm user={editUser} onUpdateUserDetail={this.onUpdateUserDetails.bind(this)} />
						}
					</ModalBody>
					<ModalFooter>
						{editUser === null ?
							<Button variant="raised" className="text-white btn-success" onClick={() => this.addNewUser()}>Add</Button>
							: <Button variant="raised" color="primary" className="text-white" onClick={() => this.updateUser()}>Update</Button>
						}
						{' '}
						<Button variant="raised" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,get_contact } = reducerApp;
	return {  loading,get_contact }
  }
  
  export default connect(mapStateToProps, {
	getContact
  })(Provider);
