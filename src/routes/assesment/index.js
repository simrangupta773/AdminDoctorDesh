/**
 * About Us Page
 */
import React, { Component } from 'react';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

const options = [
	'Little interest or pleasure in doing things',
	'Show all notification content',
	'Hide sensitive notification content',
	'Hide all notification content',
  ];

class Assessment extends Component {
	constructor(props) {
		super(props)
		this.state={
			expanded: null,
			anchorEl: null,
			selectedIndex: 1,
		}
	  }
	  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
	  handleChange = panel => (event, expanded) => {
		this.setState({
		  expanded: expanded ? panel : false,
		});
	  };
		
	render() {
		const { expanded } = this.state;
		const { anchorEl } = this.state;
		return (
			<div className="about-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.assesment" />} match={this.props.match} />
				<div className="about-detail mb-4">	
					<ExpansionPanel className="mb-2" expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
					<ExpansionPanelSummary className="top-panel" expandIcon={<i className="zmdi zmdi-chevron-down text-white"></i>}>
						<Typography className="col-md-3"><h1 className="mb-0 text-white">4AT</h1></Typography>
						<Typography className=""><h3  className="mb-0 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3></Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
						<List component="nav">
							<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
								onClick={this.handleClickListItem} >
								<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
							</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
							{options.map((option, index) => (
								<MenuItem
								key={option}
								disabled={index === 0}
								selected={index === this.state.selectedIndex}
								onClick={event => this.handleMenuItemClick(event, index)}>
								{option}
								</MenuItem>
							))}
							</Menu>

							<List component="nav">
								<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
									onClick={this.handleClickListItem} >
									<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
								</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
								{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === this.state.selectedIndex}
									onClick={event => this.handleMenuItemClick(event, index)}>
									{option}
								</MenuItem>
							))}
							</Menu>
						</Typography>
					</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel className="mb-2" expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
					<ExpansionPanelSummary className="top-panel"  expandIcon={<i className="zmdi zmdi-chevron-down text-white"></i>}>
					<Typography className="col-md-3"><h1 className="mb-0 text-white">AIMS</h1></Typography>
						<Typography className="text-muted"><h3 className="mb-0 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3></Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
						<List component="nav">
								<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
									onClick={this.handleClickListItem} >
									<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
								</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
								{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === this.state.selectedIndex}
									onClick={event => this.handleMenuItemClick(event, index)}>
									{option}
								</MenuItem>
							))}
							</Menu>
							<List component="nav">
								<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
									onClick={this.handleClickListItem} >
									<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
								</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
								{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === this.state.selectedIndex}
									onClick={event => this.handleMenuItemClick(event, index)}>
									{option}
								</MenuItem>
							))}
							</Menu>
						</Typography>
					</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel className="mb-2" expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
					<ExpansionPanelSummary className="top-panel"  expandIcon={<i className="zmdi zmdi-chevron-down text-white "></i>}>
					<Typography className="col-md-3"><h1 className="mb-0 text-white">AMT</h1></Typography>
						<Typography className="text-muted"><h3 className="mb-0 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3></Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
						<List component="nav">
								<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
									onClick={this.handleClickListItem} >
									<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
								</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
								{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === this.state.selectedIndex}
									onClick={event => this.handleMenuItemClick(event, index)}>
									{option}
								</MenuItem>
							))}
							</Menu>
							<List component="nav">
								<ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="When device is locked"
									onClick={this.handleClickListItem} >
									<ListItemText primary="Little interest or pleasure in doing things" secondary={options[this.state.selectedIndex]} />
								</ListItem>
							</List>
							<Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
								{options.map((option, index) => (
								<MenuItem
									key={option}
									disabled={index === 0}
									selected={index === this.state.selectedIndex}
									onClick={event => this.handleMenuItemClick(event, index)}>
									{option}
								</MenuItem>
							))}
							</Menu>
						</Typography>
					</ExpansionPanelDetails>
					</ExpansionPanel>
				</div>
			</div>
		);
	}
}

export default Assessment;
