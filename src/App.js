import React from 'react';
import './App.css';
import {Container,Row,Col} from 'react-bootstrap';
import ContentLayout from './ContentLayout';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import axios from 'axios';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      activeButton:"zero-state",
      searchKeyword:'',
      rows:[]
    };
  }
  changeButton =(activeButton)=>{
    this.setState({activeButton:activeButton});
  }
  createData= (published_date, headline, summary, url, source) =>{
    return { published_date, headline, summary, url, source };
  }

  setSearchKeyword=async (searchKeyword,activeButton)=>{

    let response = await axios({
      method: 'get',
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq='+searchKeyword+'&facet=true&begin_year=2011&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei&sort=newest&page='+0+'&fl=web_url&fl=pub_date&fl=headline&fl=abstract&fl=source'
    });
    var data = response.data.response.docs;
    var rows=[];
    for(var i=0;i<data.length;i++){
      var d = this.createData(data[i].pub_date.split('T')[0],data[i].headline.main,data[i].abstract.substring(0,90)+"...",<a href={data[i].web_url} target="_blank">Go to article</a>,data[i].source);
      rows.push(d);
    }
    this.setState({searchKeyword:searchKeyword,activeButton:activeButton,rows:rows});
  }
  render() {
    return (
      <Container fluid className="MainPage">
    <Row className="top-bar">
      <Col className="logo-bar" md={{span: 2}}><img alt='logo' src='nytimes.png'  height="100%"></img></Col>
      <Col className="search-bar" md={{span: 10}}><SearchBar setSearchKeyword={this.setSearchKeyword}/></Col>
    </Row>
    <Row className="bottom-layout">
      <Col className="side-bar-layout"  md={{span: 2}}> <SideBar  changeButton={this.changeButton}/></Col>
      <Col className="content-layout" md={{span: 10}}>
        <ContentLayout contentType={this.state.activeButton} searchkeyword={this.state.searchKeyword} defaultRows={this.state.rows}/>
      </Col>
    </Row>
  </Container>
    );
  }
}

export default App;

