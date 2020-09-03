import React from 'react';
import { Button } from 'reactstrap'


type ListState = {
    updateActive: boolean,
    characterToUpdate: Array<object>
}

type ListProps = {
    token: string,
    fetchCharacters: Function,
    characters: Array<object>
}

class CharacterList extends React.Component<ListProps, ListState> {
    constructor(props: ListProps){
        super(props)
        this.state={
            updateActive: false,
            characterToUpdate: [],
        }
    }

    //Component functions
    deleteCharacter() {
        fetch(`http://localhost:3000/character/delete/${this.props.characters.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': ' application/json',
                'Authorization': this.props.token
            })
        })
        .then(() => this.props.fetchCharacters())
    }

    editUpdateCharacter(character:Array<object>) {
        this.setState({
            characterToUpdate: character
        })
    }

    updateOn() {
        return this.setState({
            updateActive: true
        })
    }

    updateOff() {
        return this.setState({
            updateActive: false
        })
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default CharacterList;