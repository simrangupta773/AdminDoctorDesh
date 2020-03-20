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

class TermsCondition extends Component {

  constructor(props){
    super(props)
    this.state={
      terms_condition:'',
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
    this.setState({terms_condition: e.target.getContent(),errTerms:''});
  }

  addTerms = (e) =>{
    e.preventDefault();
    if(!this.state.terms_condition){
      this.setState({
        errTerms:'Please Add Some content.'
      })
    } else{
    
      let data = {
        terms_condition:this.state.terms_condition,
        errTerms:'',
      }
      this.props.addPages(data);
    } 
  }

  componentWillReceiveProps(nextProps){
   
    if(nextProps.get_pages.terms_condition!=this.state.terms_condition) {
      this.setState({terms_condition:nextProps.get_pages.terms_condition})
    }
  }

  render() {
    const {terms_condition} = this.state;
   
    
    
    
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.termConditions" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.termConditions" />}>
         <span style={{color:'red'}}>{this.state.errTerms} </span>
        <Editor
        initialValue={this.state.terms_condition}
        value={this.state.terms_condition}
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


export default connect(mapStateToProps,{addPages,getPages})(TermsCondition);