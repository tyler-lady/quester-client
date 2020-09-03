import React, { FormEvent } from 'react';
import {
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    Button
} from 'reactstrap';

type LoginStates = {
    username: string,
    password: string
}

type LoginProps = {
    updateToken: Function,
    toggle: Function,
}

class Login extends React.Component<LoginProps, LoginStates>{
    constructor(props: LoginProps){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    //functions to be used
    handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        fetch("http://localhost:3000/user/login",{
            method: 'POST',
            body: JSON.stringify({user:{username:this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        )   .then((data) => {
            this.props.updateToken(data.sessionToken)
        }) .then(() => {
            if(localStorage.getItem('token')) {
                this.props.toggle();
            }
        })
    }

    render(){
        return(
            <div>
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
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            </div>
        )
    }
}

export default Login;