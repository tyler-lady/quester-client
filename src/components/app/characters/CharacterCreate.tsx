import React, { FormEvent } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../../App.css'

//TODO:
//setting isActive to true will fetch all active characters and put isActive as false. 
//creating character stats. We fetch the race json object, access the attributes, then createAttributeEntry using the values from my object
//determine lifecycle to run our fetch for the stats (componentDidUpdate(this.state.))


type CreateState = {
    name: string,
    biography: string,
    race: string,
    class: string,
    isActive: boolean
}

type CreateProps = {
    token: string
}

class CharacterCreate extends React.Component<CreateProps, CreateState> {
    constructor(props: CreateProps){
        super(props)
        this.state = {
            name: "",
            biography: "",
            race: "",
            class: "",
            isActive: false
        }
    }

    handleSubmit(event: FormEvent){
        event.preventDefault();

        fetch("http://localhost:3000/user/signup", {
            method: 'POST',
            body: JSON.stringify({character: {name:this.state.name,biography:this.state.biography,race:this.state.race,class:this.state.class,isActive:this.state.isActive}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
        .then((response) => response.json())
        .then((charData) => {

        })
        .catch(() => console.log({error: "no session token exists"}))
    }

    render(){
        return(
            <div className="main creatForm">
                <div className="mainDiv">
                    <h1 className="create">Create Your New Character</h1>
                    <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="name">Name:</Label>
                <Input onChange={(e) => this.setState({name: (e.target.value)})} name="name" value={this.state.name}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="biography">Biography:</Label>
                <Input onChange={(e) => this.setState({biography: (e.target.value)})} name="biography" value={this.state.biography}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="race">Race:</Label>
                <Input onChange={(e) => this.setState({race: (e.target.value)})} name="race" value={this.state.race}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="class">Class:</Label>
                <Input onChange={(e) => this.setState({class: (e.target.value)})} name="class" value={this.state.class}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Set this as your Active Character?</Label>
                <Input onChange={(e) => this.setState({isActive: (e.target.value)})} name="description" value={this.state.isActive}/>
            </FormGroup>
            <Button type="submit">Create</Button>
        </Form>
                </div>
            </div>
        )
    }
}