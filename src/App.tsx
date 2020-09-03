import React from 'react';
import './App.css';
import Header from './components/site/header';
import Sidebar from './components/site/sidebar';
import Footer from './components/site/footer';


type AppState = {
  token : String | null
}

type AppProps = {
  message?:  ""
}

class App extends React.Component <AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
      token: new String()
    }
  }

  
  componentWillMount() {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token')
      })
    }
  }

  clearToken() {
    localStorage.clear();
    this.setState({
      token: null
    })
  }


  render(){
    return (
      <div className="App">
        <Header />
        <Sidebar clickLogout={this.clearToken} token={this.state.token} />
        <Footer />
      </div>
    );
  }
}

export default App;
