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
import Character from '../types/Character';


type EditState = {
    editName: string,
    editBiography: string,
    editClass: string,
    isActive: boolean
}

type EditProps = {
    token: string,
    characterToUpdate: Character,
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
            isActive: false,
        }
    }
    
    

    // Component Functions here
    characterUpdate(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.characterRequest(this.props.characterToUpdate.id);
    }
    
    characterRequest(id:number) {
        fetch(`http://localhost:3000/character/${id}`, {
            method: 'PUT',
            body: JSON.stringify({character: {name: this.state.editName, biography: this.state.editBiography, class: this.state.editClass}}),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token
            }),
        }).then((res) => {
            this.props.fetchCharacters();
            this.props.updateOff();
        })
    }

    render(){
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update Your Character!</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.characterUpdate}>
                        <FormGroup>
                            <Label htmlFor="name">Edit Name:</Label>
                                <Input
                                name="name"
                                value={this.state.editName}>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="bio">Edit Biography:</Label>
                                <Input
                                name="bio"
                                value={this.state.editBiography}>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="class">Change Class:</Label>
                                <Input
                                name="class"
                                value={this.state.editClass}>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="isActive">Set As Active Character?</Label>
                                <Input
                                name="isActive"
                                checked={this.state.isActive}>
                                </Input>
                        </FormGroup>
                        <Button type="submit">Update Character</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default CharacterEdit;