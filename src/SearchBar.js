import './App.css';
import React from 'react'

class SearchBar extends React.Component {
    
    validateAndSearch = (id,callback)=>{
      //you can add input validations here
      if(document.getElementById("keyword").value===''){
        alert("Enter a valid keyword!");
        return false;
      }
      callback(document.getElementById("keyword").value,"search-results");
    }
    render() {
      return (
        <form className='SearchForm'>
        <input className='SearchBox' type="text" placeholder="Search.." id='keyword'/>
        <button className='SubmitButton' onClick = {(e)=>{e.preventDefault();return this.validateAndSearch('keyword',this.props.setSearchKeyword)}}> <p style={{color:'#FFFFFF',font:"Roboto"}}>Submit</p></button>
        </form>
      );
    }
}

export default SearchBar;