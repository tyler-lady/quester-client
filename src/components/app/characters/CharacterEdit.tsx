import React, { FormEvent } from 'react';
import {
    Modal,
    FormGroup,
    Input,
    Form,
    Button,
    Label,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

type EditState = {
    editName: string,
    editBiography: string,
    editClass: string,
    isActive: boolean
}

type EditProps = {
    token: string,
    characterToUpdate: Array<object>,
    updateOff: Function,
    fetchCharacters: Function
}

class CharacterEdit extends React.Component<EditProps, EditState> {
    constructor(props: EditProps){
        super(props)
        this.state = {
            //initial values are set from character to update, and passed in as props to prevent unintentionally overwriting 
            editName: "",
            editBiography: "",
            editClass: "",
            isActive: false
        }
    }

    //Component Functions here
    characterUpdate (event: FormEvent) {
        event.preventDefault();
        fetch(`http://localhost:3000/character/${this.props.characterToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({character: {name: this.state.editName, biography: this.state.editBiography, class: this.state.editClass}}),
            headers: new Headers({
                "Content-Type": "aplication/json",
                Authorization: this.props.token
            }),
        }).then((res) => {
            
        })
    }


    render(){
        return(
            <>

            </>
        )
    }
}

export default CharacterEdit;