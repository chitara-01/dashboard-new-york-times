import './App.css';
import React from 'react'


class SideBar extends React.Component {
    constructor(){
        super();
        this.state = {activeButton:"Dashboard"};
    }
    
    handleButtonDisplay=(selectedButtonId)=>{
      for(var i=1;i<=5;i++){
        if(i===selectedButtonId){
          document.getElementById('#button'+i).style.color = '#4CA2FF';
          document.getElementById('#button'+i).style.backgroundColor = 'white';
        }else{
          document.getElementById('#button'+i).style.color = 'black';
          document.getElementById('#button'+i).style.backgroundColor = '#F6F8F8';
        }
    }
  }
    render() {
      return (
        <div>
            <button className='SideBarTitles' id='#button1' onClick= {()=>{this.handleButtonDisplay(1);this.props.changeButton('Dashboard')}} >Dashboard </button>
            <button className='SideBarTitles' id='#button2' onClick= {()=>{this.handleButtonDisplay(2);this.props.changeButton('Articles')}}>Articles</button>
            <button className='SideBarTitles' id='#button3' onClick= {()=>{this.handleButtonDisplay(3);this.props.changeButton('Analytics')}}>Analytics</button>
            <button className='SideBarTitles' id='#button4' onClick= {()=>{this.handleButtonDisplay(4);this.props.changeButton('Messages')}}>Messages</button>
            <button className='SideBarTitles' id='#button5' onClick= {()=>{this.handleButtonDisplay(5);this.props.changeButton('Calendar')}}>Calendar</button>
        </div>
      );
    }
}

export default SideBar;