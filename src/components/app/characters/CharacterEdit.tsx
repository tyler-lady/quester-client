import React, { FormEvent } from "react";
import {
  Modal,
  FormGroup,
  Input,
  Form,
  Button,
  Label,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Character from "../types/Character";
import Class from "../types/Class";
import Attributes from "../types/Attribute";

//TODO:
//Hide class options until populated from fetch? Which won't run until Race is selected, so onChange.

type EditState = {
  editName: string,
  editBiography: string,
  editClass: string,
  isActive: boolean,
  
  classResponse: Class[],
  classAttributes: Attributes,
  attributes: Attributes,
};

type EditProps = {
  token: string,
  characterToUpdate: Character,
  updateOff: Function,
  fetchCharacters: Function,
  fetchActive: Function,
  activeCharacter: Character[],
};

class CharacterEdit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      editName: this.props.characterToUpdate.name,
      editBiography: this.props.characterToUpdate.biography,
      editClass: this.props.characterToUpdate.class,
      isActive: this.props.characterToUpdate.isActive,
      attributes: {
        HP: 0,
            Strength: 0,
            Speed: 0,
            Agility: 0,
            Intelligence: 0,
            Charisma: 0,
      },
      classResponse: [
        {
          Name: "",
          Stats: {
            HP: 0,
                Strength: 0,
                Speed: 0,
                Agility: 0,
                Intelligence: 0,
                Charisma: 0,
          },
        },
        {
          Name: "",
          Stats: {
            HP: 0,
                Strength: 0,
                Speed: 0,
                Agility: 0,
                Intelligence: 0,
                Charisma: 0,
          },
        },
      ],
      classAttributes: {
        HP: 0,
            Strength: 0,
            Speed: 0,
            Agility: 0,
            Intelligence: 0,
            Charisma: 0,
      },
    };
    this.characterUpdate = this.characterUpdate.bind(this)
    this.characterUpdateRequest = this.characterUpdateRequest.bind(this)
    this.fetchClasses = this.fetchClasses.bind(this)
    this.attributeUpdate = this.attributeUpdate.bind(this)
    this.toggleIsActive = this.toggleIsActive.bind(this)
    this.updateIsActive = this.updateIsActive.bind(this)
  }

  // Component Functions here
  characterUpdate(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.isActive) {
      this.props.fetchActive()
      this.updateIsActive(this.props.activeCharacter);
    }
    this.characterUpdateRequest(this.props.characterToUpdate.id);
  }

  characterUpdateRequest(id: number) {
    fetch(`http://localhost:3000/character/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        character: {
          name: this.state.editName,
          biography: this.state.editBiography,
          class: this.state.editClass,
          isActive: this.state.isActive,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    }).then((res) => {
      if(this.state.editClass !== ''){
        this.attributeUpdate(this.state.classAttributes, this.props.characterToUpdate.id);
      }
      this.props.fetchCharacters();
      this.props.updateOff();
    });
  }

  fetchClasses(characterToUpdate: Character) {
    console.log('fetchClasses hit', characterToUpdate)
    fetch(`http://localhost:3000/class/${characterToUpdate.race.toLowerCase()}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((attributeData) => {
        this.setState({
          classResponse: attributeData.Classes,
        });
      })
      .then(() => {
        for (let i = 0; i < this.state.classResponse.length; i++) {
          if (this.state.classResponse[i].Name == this.state.editClass) {
            return this.setState({
              classAttributes: this.state.classResponse[i].Stats,
            });
          }
        }
      })
      // .then(() => {
      //   this.attributeUpdate(this.state.classAttributes, id);
      // });
  }

  attributeUpdate(classAttributes: Attributes, id: number) {
    console.log('attrUpdate hit', id)
    fetch("http://localhost:3000/attribute/update/attribute", {
      method: "PUT",
      body: JSON.stringify({
        attribute: {
          hp: classAttributes.HP,
          strength: classAttributes.Strength,
          speed: classAttributes.Speed,
          agility: classAttributes.Agility,
          intelligence: classAttributes.Intelligence,
          charisma: classAttributes.Charisma,
          characterId: id,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    });
  }

  toggleIsActive() {
    return this.setState({
      isActive: !this.state.isActive,
    });
  }

  updateIsActive(activeCharacters: Character[]) {
    for (let i = 0; i < activeCharacters.length; i++) {
      if (activeCharacters[i].isActive === true) {
        fetch(`http://localhost:3000/character/${activeCharacters[i].id}`, {
      method: "PUT",
      body: JSON.stringify({
        character: {
          isActive: false,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
    
      }
    }
    
  }

  componentDidMount() {
    this.fetchClasses(this.props.characterToUpdate)
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Update Your Character!</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.characterUpdate}>
            <FormGroup>
              <Label htmlFor="name">Edit Name:</Label>
              <Input
                onChange={(e) => this.setState({ editName: e.target.value })}
                name="name"
                value={this.state.editName}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="bio">Edit Biography:</Label>
              <Input
                onChange={(e) =>
                  this.setState({ editBiography: e.target.value })
                }
                name="bio"
                value={this.state.editBiography}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="class">Change Class:</Label>
              <Input value=""  onChange={(e) => this.setState({ editClass: e.target.value })}
                name="class"
                type="radio"
                id="none" />
                <Label for="none">None</Label>
                <Input value={this.state.classResponse[0].Name}  onChange={(e) => this.setState({ editClass: e.target.value })}
                name="class"
                type="radio"
                id="classOne" />
                <Label for="classOne">{this.state.classResponse[0].Name}</Label>
                <Input value={this.state.classResponse[1].Name}  onChange={(e) => this.setState({ editClass: e.target.value })}
                name="class"
                type="radio"
                id="classTwo" />
                <Label for="classTwo">{this.state.classResponse[1].Name}</Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isActive">Set As Active Character?</Label>
              <Input
                type="checkbox"
                onChange={this.toggleIsActive}
                name="isActive"
                checked={this.state.isActive}
              />
            </FormGroup>
            <Button type="submit">Update Character</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default CharacterEdit;
