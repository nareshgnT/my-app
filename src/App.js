import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios')

class App extends Component {
  constructor(props) {
    super(props);    
  }
  componentWillMount(){
    this.listRootDir()
  }
  getFile = (filename) =>{
    console.log("==============", filename)
    axios.get('/getIndex/'+filename)
    .then(function (response) {
      document.getElementById('people').innerHTML = response.data.map(function (person) {
        return (
          person
        );
      }).join('')
    })
  }
  listRootDir(){
    axios.get('/listRootDir')
    .then(function (response) {
      document.getElementById('people').innerHTML = response.data.map(function (person) {
        return (
          '<li className="row">' +
            '<div className="col-md-3">' +
              '<strong> <a href="#" onClick="this.getFile(\''+person.name+'\')">' + person.name + '</a></strong>' +
              '<div>' + person.createdTime + '</div>' +
              '<div>' + person.updatedTime + '</div>' +
            '</div>' +
          '</li><br/>'
        );
      }).join('');
    })
    .catch(function (err) {
      document.getElementById('people').innerHTML = '<li class="text-danger">' + err.message + '</li>';
    });

  }
  render() {
    return (
      <div className="App">
            <ul id="people" className="list-unstyled"></ul>
      </div>
    );
  }
}

export default App;
