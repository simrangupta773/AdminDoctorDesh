import React, { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import {Button} from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';


import { connect } from 'react-redux';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {addPages,getPages} from '../../actions/AppActions';

import { Editor } from '@tinymce/tinymce-react';

class AboutUs extends Component {
    
  constructor(props){
    super(props)
    this.state ={
      content:'',
      errAbout:'',
      
        time: 0,
        start: 0
      
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

    this.handleEditorChange=this.handleEditorChange.bind(this);
  }


  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now()
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1)
    console.log("start")
  }
  stopTimer() {
    clearInterval(this.timer)
    console.log("stop")
  }
  resetTimer() {
    this.setState({time: 0})
    console.log("reset")
  }


  componentDidMount(){
    this.props.getPages()
  }

  handleEditorChange(e){
    console.log('Content was updated:', e.target.getContent());
    this.setState({content: e.target.getContent(),errAbout:''});
  }

  addAbout = (e) =>{
    e.preventDefault();
  
    if(!this.state.content){
      this.setState({
        errAbout:'Please Add Some content.'
      })
    } else{
    
      let data = {
        about:this.state.content,
        errAbout:''
      }
      this.props.addPages(data);
    } 

  }

  componentWillReceiveProps(nextProps){
   

    if(nextProps.get_pages.about!=this.state.content) {
      this.setState({content:nextProps.get_pages.about})
    }

    }
   
  render() {
    const {content} = this.state;
    return (

      

       
      <div className="editor-wrapper">
       <h3>timer: {this.state.time}</h3>
         <button onClick={this.startTimer}>start</button>
         <button onClick={this.stopTimer}>stop</button>
         <button onClick={this.resetTimer}>reset</button>

        <PageTitleBar title={<IntlMessages id="sidebar.aboutUs" />} match={this.props.match} />
        <RctCollapsibleCard heading={<IntlMessages id="sidebar.aboutUs" />}>
          
        <span style={{color:'red'}}>{this.state.errAbout}</span>
          <Editor
        initialValue={content}
        value={this.state.content}
        init={{ plugins: 'code',
        toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'}}
         onChange={this.handleEditorChange}/>

          <div>
              <Button variant="raised"  className="btn-success text-white mt-10" onClick={(e)=>this.addAbout(e)}>Save</Button>
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


export default connect(mapStateToProps,{addPages,getPages})(AboutUs);
