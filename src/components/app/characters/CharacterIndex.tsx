//TODO:
//On our Character's page, I'd like to display the active character's info. 
//I would like to show a list of all user characters - The list will provide the option to update or delete characters
//I need a link to create new characters
//Would appreciate the ability to check for characters and if a user doesn't have any to simply display the CharacterCreate
//We need two displays - one for a list of all - another for individual character

import React from 'react';
import "../../../App.css";
import { Row, Col } from 'reactstrap';
import CharacterList from './CharacterList';
import Character from '../types/Character';
import CharacterCreate from './CharacterCreate';


type IndexState = {
    characters: Character[],
    activeCharacters: Character[],
    simpleToken: string
}

type IndexProps = {
    token: string
}

class CharacterIndex extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps){
        super(props)
        this.state = {
            characters: [],
            activeCharacters: [],
            simpleToken: ''
        }
        this.fetchCharacters = this.fetchCharacters.bind(this)
        this.fetchActive = this.fetchActive.bind(this)
    }

    //Functions to be used in component
    fetchCharacters () {
        fetch('http://localhost:3000/character/user/mine', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: this.props.token
            })
        }) .then((res) => res.json())
        .then((data) => {
            console.log('fetchChar hit', data)
            this.setState({
                characters: data
            })
        })
    }

    fetchActive() {
        fetch('http://localhost:3000/character/mine/active', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: this.props.token
            })
        }) .then((res) => res.json())
        .then((data) => {
            if(data !== []){
                console.log('fetchActive hit', data)
                this.setState({
                    activeCharacters: data
                })
            }
            
        })
    }

    componentWillMount() {
        this.fetchCharacters();
        this.fetchActive();
    };

    //Below are functions to be used in multiple child components


    //TODO:
    //I would like the active character being mapped thru CharacterView, always the active character. 
    //CharacterView should be displayed atop the page
    //The CharacterList is displayed at the bottom of the page. 
    //CharacterCreate should either be a modal, or individual component. We can Route to it from here. Then Route back to Index from it.
    //We need to figure out stats/attributes. They will have their own display Module to be used in the CharacterView Module to be shown with the activeCharacter on our Index

    render(){
        return(
            <div>
                <CharacterCreate token={this.props.token} fetchActive={this.fetchActive} fetchCharacters={this.fetchCharacters} activeCharacters={this.state.activeCharacters} />
                <CharacterList fetchActive={this.fetchActive} fetchCharacters={this.fetchCharacters} token={this.props.token} characters={this.state.characters} activeCharacters={this.state.activeCharacters} />
            </div>
        )
    }
}

export default CharacterIndex;