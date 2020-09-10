import React, { FormEvent } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    Row
} from 'reactstrap';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import App from '../../App';


//Can create a .then() statement to check for the returned token, if it's undefined or null then it renders a p tag with "We're sorry, either that account already exists or there was an error creating you", else render and route us to the main App component which will check for the token and then display the app as it should exist. 

type SignupState = {
    username: string,
    password: string,
    email: string,
    redirect: boolean
}

type SignupProps = {
    updateToken: Function,
    loginStatus: Function
}

class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Functions to be used in component
    handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        //TODO: Could set this up so that the redirect occurs after the location.replace. Rn, the redirect is quicker. 
        fetch("http://localhost:3000/user/signup",{
            method: 'POST',
            body: JSON.stringify({user:{email:this.state.email, username:this.state.username, password:this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then((response) => response.json()
        )   .then((data) => {
            if(data.sessionToken !== undefined){
                this.props.updateToken(data.sessionToken);
                //this.props.loginStatus();
                window.location.replace('http://localhost:3001/main')
                this.setState({
                    redirect: true
                  })
              }
        }) 
        .catch(() => console.log({ error: "Signup Failed!" }))
    }

    render(){
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
        return(
            <div>
                <Row>
            <h1>Welcome to Quester!</h1>
          </Row>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username:</Label>
                    <Input 
                    onChange={(e) => this.setState({username: (e.target.value)})} 
                    name="username" 
                    value={this.state.username} 
                    required
                    placeholder="username1"
                    minLength={4}
                    pattern="^(?=.*[A-Za-z])((?=.*\d)|(?=.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{4,}$"
                    />
                    <FormText><p>Username must include letters, and one number or special character. Minimum length of 4 characters.</p></FormText>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input 
                    onChange={(e) => this.setState({email: (e.target.value)})} 
                    name="email" 
                    value={this.state.email}
                    required
                    type="email"
                    pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                    placeholder="user@email.com"
                    />
                    <FormText><p>Must be a valid email.</p></FormText>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input 
                    onChange={(e) => this.setState({password: (e.target.value)})} 
                    name="password" 
                    value={this.state.password} 
                    required
                    type="password"
                    minLength={5}
                    placeholder="******"
                    />
                    <FormText><p>Password has a minimum length of 5 characters.</p></FormText>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            </div>
        )
    }
}

export default Signup;