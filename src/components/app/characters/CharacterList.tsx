import React, { Key } from 'react';
import { Table, Button } from 'reactstrap';
import CharacterEdit from './CharacterEdit';
import Character from '../types/Character';

type ListState = {
    updateActive: boolean,
    characterToUpdate: Character | null
}

type ListProps = {
    token: string,
    fetchCharacters: Function,
    characters: Character[]
}



class CharacterList extends React.Component<ListProps, ListState> {
    constructor(props: ListProps){
        super(props)
        this.state={
            updateActive: false,
            characterToUpdate: null,
        }
    }

    //Component functions
    deleteCharacter(id: number): void {
        fetch(`http://localhost:3000/character/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': ' application/json',
                'Authorization': this.props.token
            })
        })
        .then(() => this.props.fetchCharacters())
    }

    charactersMapper() {
        return this.props.characters.map((character, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{character.name}</th>
                    <td>{character.biography}</td>
                    <td>{character.race}</td>
                    <td>{character.class}</td>
                    <td>{character.isActive}</td>
                    <td>{character.isDead}</td>
                    <td>
                        <Button></Button>
                        <Button color="warning" onClick={() => {this.editUpdateCharacter(character)}}>Update</Button>
                        <Button color="danger" onClick={() => {this.deleteCharacter(character.id)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    editUpdateCharacter(character: Character) {
        this.setState({
            characterToUpdate: character
        })
    }

    // CreateRow (character) : JSX

    // TODO: 

    render(){
        return(
            <>
                <h3>Your Characters</h3>
                <hr/>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Race</th>
                            <th>Class</th>
                            <th>Active Character</th>
                            <th>Deceased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.charactersMapper()}
                    </tbody>
                </Table>
                {this.state.characterToUpdate ? <CharacterEdit characterToUpdate={this.state.characterToUpdate} updateOff={() => this.setState({ characterToUpdate: null })} token={this.props.token} fetchCharacters={this.props.fetchCharacters} /> : <></>}
            </>
        )
    }
}

export default CharacterList;