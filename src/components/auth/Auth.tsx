import React from "react";
import Login from "./Login";
import Signup from "./Signup";

type AuthState = {
  sessionToken: string | null,
  login: boolean,
};

type AuthProps = {
  token?: string | null,
  loginStatus: Function
};

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      sessionToken: "",
      login: false,
    }
    this.updateToken = this.updateToken.bind(this)
  }


  loginToggle = (event: React.MouseEvent) => {
    event.preventDefault();

    this.setState({
      login: !this.state.login,
    });
  }

  updateToken(newToken: string) {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  

  render() {
    return (
      <div>
          {!(this.state.login) ? 
          <div>
          <Login updateToken={this.updateToken} loginStatus={this.props.loginStatus} /> 
          <a onClick={this.loginToggle} href='/'>
            <p>Don't have an account?</p>
          </a>
          </div> :
          <div>
          <Signup updateToken={this.updateToken} loginStatus={this.props.loginStatus} />
          <a onClick={this.loginToggle} href='/'>
            <p>Already have an account?</p>
          </a>
          </div>
          }
      </div>
    );
  }
}

export default Auth;
