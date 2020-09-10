import React, { FormEvent } from "react";
import { Form, FormGroup, FormText, Label, Input, Button, Row } from "reactstrap";
import App from '../../App';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";



type LoginStates = {
  username: string,
  password: string,
  redirect: boolean
};

type LoginProps = {
  updateToken: Function,
  loginStatus: Function
};

class Login extends React.Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //functions to be used
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //TODO: Could set this up so that the redirect occurs after the location.replace. Rn, the redirect is quicker.
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: { username: this.state.username, password: this.state.password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.sessionToken !== undefined){
          this.props.updateToken(data.sessionToken);
          // this.props.loginStatus()
          window.location.replace('http://localhost:3001/main')
          this.setState({
            redirect: true
          })
        }
      })
      .catch(() => console.log({ error: "Login Failed!" }))
  }

  render() {
    const { redirect } = this.state;
    if(redirect) {
      return(
        <Router>
          
          <Switch>
          <Redirect push from="/auth" to={{
            pathname: "/",
          }}/>
          <Route exact path="/">
            <App />
          </Route>
          
        </Switch>
        </Router>
      )
    }

    return (
      <div>
        <Row>
            <h1>Welcome to Quester!</h1>
          </Row>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              name="username"
              value={this.state.username}
              required
              placeholder="username1"
              minLength={4}
              pattern="^(?=.*[A-Za-z])((?=.*\d)|(?=.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{4,}$"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              value={this.state.password}
              required
              type="password"
              minLength={5}
              placeholder="******"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>

        
      </div>
    );
  }
}

export default Login;
