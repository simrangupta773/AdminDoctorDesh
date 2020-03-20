import React, { Component } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import {Button} from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {connect} from 'react-redux';

import {addPages,getPages} from '../../actions/AppActions';

class MainOffice extends Component {

  constructor(props){
    super(props)
    this.state={
      contact_mainOffice:'',
      errTerms:'',
      hasError:''
    }

    this.handleEditorChange=this.handleEditorChange.bind(this);

  }

  componentDidMount(){
    this.props.getPages()
  }

 


  handleEditorChange(e){
    console.log('Content was updated:', e.target.getContent());
    this.setState({contact_mainOffice: e.target.getContent(),errTerms:''});
  }

  addTerms = (e) =>{
    e.preventDefault();
    if(!this.state.contact_mainOffice){
      this.setState({
        errTerms:'Please Add Some content.'
      })
    } else{
    
      let data = {
        contact_mainOffice:this.state.contact_mainOffice,
        errTerms:'',
      }
      this.props.addPages(data);
    } 
  }

  componentWillReceiveProps(nextProps){
   
    if(nextProps.get_pages.contact_mainOffice!=this.state.contact_mainOffice) {
      this.setState({contact_mainOffice:nextProps.get_pages.contact_mainOffice})
    }
  }

  render() {
    const {contact_mainOffice} = this.state;
   
    
    
    
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.main_office" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.main_office" />}>
         <span style={{color:'red'}}>{this.state.errTerms} </span>
        <Editor
        initialValue={this.state.contact_mainOffice}
        value={this.state.contact_mainOffice}
        init={{ plugins: 'code',
        toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'}}
         onChange={this.handleEditorChange}/>

          <div>
              <Button variant="raised"  className="btn-success text-white mt-10" onClick={(e)=>this.addTerms(e)}>Save</Button>
          </div>
        </RctCollapsibleCard>
      </div>
    );
  }
}

const mapStateToProps = ({reducerApp}) =>{
  const {loading,get_pages} = reducerApp;
  return {loading,get_pages}
}


export default connect(mapStateToProps,{addPages,getPages})(MainOffice);