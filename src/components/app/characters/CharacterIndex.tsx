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


type IndexState = {
    characters: Array<Character>,
    activeCharacter: Character | null,
}

type IndexProps = {
    token: string
}

class CharacterIndex extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps){
        super(props)
        this.state = {
            characters: [],
            activeCharacter: null,
        }
    }

    //Functions to be used in component
    fetchCharacters () {
        fetch('http://localhost:3000/character/mine', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then((res) => res.json())
        .then((data) => {
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
                'Authorization': this.props.token
            })
        }) .then((res) => res.json())
        .then((data) => {
            this.setState({
                activeCharacter: data
            })
        })
    }

    componentWillMount() {
        this.fetchCharacters();
        this.fetchActive();
    };

    //TODO:
    //I would like the active character being mapped thru CharacterView, always the active character. 
    //CharacterView should be displayed atop the page
    //The CharacterList is displayed at the bottom of the page. 
    //CharacterCreate should either be a modal, or individual component. We can Route to it from here. Then Route back to Index from it.
    //We need to figure out stats/attributes. They will have their own display Module to be used in the CharacterView Module to be shown with the activeCharacter on our Index

    render(){
        return(
            <div>

                <CharacterList fetchCharacters={this.fetchCharacters} token={this.props.token} characters={this.state.characters} />
            </div>
        )
    }
}

export default CharacterIndex;