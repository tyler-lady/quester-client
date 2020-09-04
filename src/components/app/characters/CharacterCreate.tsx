import React, { FormEvent } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../../App.css'
import Character from '../types/Character';
import Attributes from '../types/Attribute'

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
    attributes: Attributes
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
            isActive: true,
            attributes: {
                hp:0,
                strength: 0,
                speed: 0,
                agility: 0,
                intelligence: 0,
                charisma: 0,
                characterId: 0
            }
        }
    }

    handleSubmit(event: FormEvent){
        event.preventDefault();

        fetch("http://localhost:3000/character/create", {
            method: 'POST',
            body: JSON.stringify({character: {name:this.state.name,biography:this.state.biography,race:this.state.race,class:this.state.class,isActive:this.state.isActive}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
        .then((response) => response.json())
        .then((charData) => {
            //charData.race should exist now, pass it into the fetch
            //charData.id should exist now, pass it into the request
            this.attributeFetch(charData.race, charData.id)
        })
        .catch(() => console.log({error: "no session token exists"}))
    }

    attributeCreate(attributes: Attributes, id:number) {
        fetch(`http://localhost:3000/attribute/new`, {
            method: 'POST',
            body: JSON.stringify({attributes: {hp: attributes.hp, strength: attributes.strength, speed: attributes.speed, agility: attributes.agility, intelligence: attributes.intelligence, charisma: attributes.charisma, characterId: id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            }) 
        })

    }

    attributeFetch(race: string, id: number) {
        fetch(`http://localhost:3000/race/${race}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((attributeData) => {
            this.setState({
                attributes: attributeData.Stats
            })
        })
        .then(() => {
            this.attributeCreate(this.state.attributes, id)
        })
    }

    toggleIsActive(){
        return this.setState({
            isActive: !(this.state.isActive)
        })
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
                <Label htmlFor="isActive">Set this as your Active Character?</Label>
                <Input type='checkbox' onChange={this.toggleIsActive} name="isActive" checked={this.state.isActive}/>
            </FormGroup>
            <Button type="submit">Create</Button>
        </Form>
                </div>
            </div>
        )
    }
}

export default CharacterCreate;