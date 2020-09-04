import React, { FormEvent } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText
} from 'reactstrap';


//Can create a .then() statement to check for the returned token, if it's undefined or null then it renders a p tag with "We're sorry, either that account already exists or there was an error creating you", else render and route us to the main App component which will check for the token and then display the app as it should exist. 

type SignupState = {
    username: string,
    password: string,
    email: string,
}

type SignupProps = {
    updateToken: Function,
    toggle: Function,
}

class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    //Functions to be used in component
    handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        fetch("http://localhost:3000/user/signup",{
            method: 'POST',
            body: JSON.stringify({user:{email:this.state.email, username:this.state.username, password:this.state.password}}),
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
                    //className= {errors.username ? ":invalid" : ":valid}"}
                    />
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
                    //className= {errors.email ? ":invalid" : ":valid}"}
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
                    //className= {errors.password ? ":invalid" : ":valid}"}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            </div>
        )
    }
}

export default Signup;