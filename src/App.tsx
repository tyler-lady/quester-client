import React from 'react';
import './App.css';
import Header from './components/site/header';
import Sidebar from './components/site/sidebar';
import Footer from './components/site/footer';
import Auth from './components/auth/Auth'
import { BrowserRouter as Router } from 'react-router-dom';


type AppState = {
  token : string | null,
  loggedIn: boolean
}

type AppProps = {
  message?:  ""
}

class App extends React.Component <AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
      token: '',
      loggedIn: false
    }
    this.clearToken = this.clearToken.bind(this);
    this.loginStatus = this.loginStatus.bind(this);
  }

  
  componentWillMount() {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token'),
        loggedIn: true
      })
    }
  };

  clearToken() {
    localStorage.clear();
    this.setState({
      token: null,
      loggedIn: false
    })
  };

  loginStatus() {
    this.setState({
      loggedIn: true
    })
  }

  viewSelect(loggedIn: boolean) {
    if(loggedIn === false){
      return(
        <Auth loginStatus={this.loginStatus} />
      )
    } else {
      return(
        <div>
        <Header />
        <Router>
        <Sidebar clickLogout={this.clearToken} token={this.state.token} loginStatus={this.loginStatus} />
        </Router>
        <Footer />
        </div>
      )
    }
  }


  render(){
    return (
      <div className="App">
        {this.viewSelect(this.state.loggedIn)}
        
      </div>
    );
  }
}

export default App;
