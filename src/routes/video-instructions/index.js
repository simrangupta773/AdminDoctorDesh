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

class VideoInstruction extends Component {

  constructor(props){
    super(props)
    this.state={
      calling_instruction:'',
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
    this.setState({calling_instruction: e.target.getContent(),errTerms:''});
  }

  addTerms = (e) =>{
    e.preventDefault();
    if(!this.state.calling_instruction){
      this.setState({
        errTerms:'Please Add Some content.'
      })
    } else{
    
      let data = {
        calling_instruction:this.state.calling_instruction,
        errTerms:'',
      }
      this.props.addPages(data);
    } 
  }

  componentWillReceiveProps(nextProps){
   
    if(nextProps.get_pages.calling_instruction!=this.state.calling_instruction) {
      this.setState({calling_instruction:nextProps.get_pages.calling_instruction})
    }
  }

  render() {
    const {calling_instruction} = this.state;
   
    
    
    
    return (
      <div className="editor-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.videoInstruction" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.videoInstruction" />}>
         <span style={{color:'red'}}>{this.state.errTerms} </span>
        <Editor
        initialValue={this.state.calling_instruction}
        value={this.state.calling_instruction}
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


export default connect(mapStateToProps,{addPages,getPages})(VideoInstruction);