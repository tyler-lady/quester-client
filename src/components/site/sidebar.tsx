import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../../App.css";
import { Row, Col } from "reactstrap";

import Main from './main'
import CharacterIndex from '../app/characters/CharacterIndex';
import Auth from '../auth/Auth'

//TODO: Need to add logic to check for presence of valid token to display certain options on the Sidebar. Set up a state for isLoggedIn: boolean, and check.. if(token: String && token !== ""){this.setState({isLoggedIn: true})}. We'll use a ternary in the Sidebar to determine what is shown.

type SidebarState = {
    simpleToken: string
}

type SidebarProps = {
    token: string | null,
    clickLogout: () => void,
    loginStatus: Function
}

class Sidebar extends React.Component <SidebarProps, SidebarState> {
    constructor(props: SidebarProps){
      super(props)
      this.state= {
        simpleToken: ''
      }
    }

    

    tokenValidation() {
      if(this.props.token !== null){
        this.setState({
          simpleToken: this.props.token
        })
      }
    }

    componentWillMount() {
      this.tokenValidation()
    }
  
    render(){
      return (
        <div className="sidebar-master">
      <div className="sidebar-styling">
        <Col className="sidebar">
        <Row className="sidebarIcon">
            <a href="/main">
              <h3>Home</h3>
            </a>
          </Row>
          <Row className="sidebarIcon">
            <a href="/profile">
              <h3>User</h3>
            </a>
          </Row>
          <Row className="sidebarIcon">
            <a href="/characters">
              <h3>Characters</h3>
            </a>
          </Row>
          <Row className="sidebarIcon">
              <a href="/auth">
                <h3 onClick={this.props.clickLogout}>Logout</h3>
              </a>
          </Row>
        </Col>
      </div>
      <div className="sidebar-route">
        <Router>
        <Switch>
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/characters">
            <CharacterIndex token={this.state.simpleToken} />
          </Route>
          <Route exact path="/auth">
            <Auth token={this.state.simpleToken} loginStatus={this.props.loginStatus} />
          </Route>
        </Switch>
        </Router>
      </div>
    </div>
      );
    }
  }

  export default Sidebar;

  //<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  //<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  //Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  //Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>