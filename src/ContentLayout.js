import './App.css';
import React from 'react';
import ArticleTable from './ArticleTable.jsx';

class ContentLayout extends React.Component {
    constructor() {
        super();
        this.state = {contentType: "Dashboard"};
      }
    textFunction = (textNumber)=>{
      var text;
      if (textNumber===0){
        text = "Search for breaking news from across the world, across the times.";
      }else if (textNumber===1){
        text = "Sorry, no articles to display at the moment.";
      }else if (textNumber===2){
        text = "Sorry, no analytics to display at the moment.";
      }else if (textNumber===3){
        text = "Sorry, no messages to display at the moment.";
      }else if (textNumber===4){
        text = "Sorry, no calendar to display at the moment.";
      }
      return (<div style={{height:'100%'}}>
      <div style={{height:'30%'}}><br/><br/><br/><br/>
         <p style={{width: '48%',
              height: '80%',
              marginLeft:'20%',
              textAlign: 'center',
              font: 'Bold 30px/35px Roboto',
              letterSpacing: '0px',
              color: '#7B8C92'}}>{text}</p>
    </div><div style={{height:'40%'}}>
    <img alt="zero-state-img" src="zero-state.png" height= "100%" style={{marginLeft:'35%', marginTop:'5%'}}/>
    </div>
    </div>
    );
    }
    func = ()=>{
        if(this.props.contentType==="search-results"){
          return (<div style={{height:'100%'}}>
                    <div style={{height:'90%'}}><ArticleTable searchkeyword={this.props.searchkeyword} defaultRows={this.props.defaultRows}/></div> 
                    {/* <div style={{height:'40%',marginTop:'4%'}}><Paper/></div> */}
                 </div>);
        }
        else if(this.props.contentType==="Dashboard"){
          return this.textFunction(0);
        } else if(this.props.contentType==="Articles"){
          return this.textFunction(1);
        }else if(this.props.contentType==="Analytics"){
          return this.textFunction(2);
        }else if(this.props.contentType==="Messages"){
          return this.textFunction(3);
        }else if(this.props.contentType==="Calendar"){
          return this.textFunction(4);
        }else{
          return this.textFunction(0);
        }
    }
    render(){
        return (
          <div style={{height:"100%",width:"100%"}}>{this.func()}</div>);
    } 
}

export default ContentLayout;