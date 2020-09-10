import React, { FormEvent } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../../../App.css";
import Character from "../types/Character";
import Attributes from "../types/Attribute";
import ClassResponse from "../types/ClassResponse";
import Class from "../types/Class";

//TODO:
//Hide class options until populated from fetch? Which won't run until Race is selected, so onChange.

type CreateState = {
  name: string;
  biography: string;
  race: string;
  class: string;
  isActive: boolean;
  attributes: Attributes;
  classAttributes: Attributes;
  classResponse: Class[];
  charId: number
};

type CreateProps = {
  token: string;
  fetchCharacters: Function;
  fetchActive: Function;
  activeCharacters: Character[]
};

class CharacterCreate extends React.Component<CreateProps, CreateState> {
  constructor(props: CreateProps) {
    super(props);
    this.state = {
      charId: 0,
      name: "",
      biography: "",
      race: "",
      class: "",
      isActive: true,
      attributes: {
        HP: 0,
        Strength: 0,
        Speed: 0,
        Agility: 0,
        Intelligence: 0,
        Charisma: 0,
      },
      classAttributes: {
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
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.attributeCreate = this.attributeCreate.bind(this)
    this.attributeFetch = this.attributeFetch.bind(this)
    this.fetchClasses = this.fetchClasses.bind(this)
    this.toggleIsActive = this.toggleIsActive.bind(this)
    this.updateIsActive = this.updateIsActive.bind(this)
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (this.state.isActive) {
      this.props.fetchActive()
      this.updateIsActive(this.props.activeCharacters);
    }

    fetch("http://localhost:3000/character/create", {
      method: "POST",
      body: JSON.stringify({
        character: {
          name: this.state.name,
          biography: this.state.biography,
          race: this.state.race,
          class: this.state.class,
          isActive: this.state.isActive,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((response) => response.json())
      .then((charData) => {
        console.log(charData)
        this.attributeFetch(charData.race, charData.id);
        this.setState({
          charId: charData.id
        })
        
      })
      .then(() => {
        this.props.fetchCharacters();
        this.props.fetchActive();
      })
      .catch(() => console.log({ error: "Character Creation Failed!" }));
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

  attributeCreate(attributes: Attributes, id: number) {
    fetch(`http://localhost:3000/attribute/new`, {
      method: "POST",
      body: JSON.stringify({
        attribute: {
          hp: attributes.HP,
          strength: attributes.Strength,
          speed: attributes.Speed,
          agility: attributes.Agility,
          intelligence: attributes.Intelligence,
          charisma: attributes.Charisma,
          characterId: id,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    });
  }

  attributeFetch(race: string, id: number) {
    fetch(`http://localhost:3000/race/${race.toLowerCase()}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((attributeData) => {
        if(this.state.class !== ''){
          this.setState({
            attributes: this.state.classAttributes
          })
        } else {
          this.setState({
            attributes: attributeData.Stats,
          })
        }
        ;
      })
      .then(() => {
        
        this.attributeCreate(this.state.attributes, id);
      });
  }


  fetchClasses(race: string) {
    fetch(`http://localhost:3000/class/${race.toLowerCase()}`, {
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
          if (this.state.classResponse[i].Name == this.state.class) {
            return this.setState({
              classAttributes: this.state.classResponse[i].Stats,
            });
          }
        }
      })
  }

  

  toggleIsActive() {
    return this.setState({
      isActive: !this.state.isActive,
    });
  }

  render() {
//TODO: Make the class radio buttons only visible once the information is available

    return (
      <div className="main createForm">
        <div className="mainDiv">
          <h1 className="create">Create Your New Character</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name: </Label>
              <Input
                onChange={(e) => this.setState({ name: e.target.value })}
                name="name"
                value={this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="biography">Biography: </Label>
              <Input
                onChange={(e) => this.setState({ biography: e.target.value })}
                name="biography"
                value={this.state.biography}
              />
            </FormGroup>
            <FormGroup onInput={(e) => this.fetchClasses(this.state.race)}>
              <Label htmlFor="race">Race:</Label>
                <Input value="Giant"  onChange={(e) => this.setState({ race: e.target.value })}
                name="race"
                type="radio"
                id="giant" />
                <Label for="giant">Giant</Label>  
                <Input value="Human"  onChange={(e) => this.setState({ race: e.target.value })}
                name="race"
                type="radio" 
                id="human" />
                <Label for="human">Human</Label>
                <Input value="Elf"  onChange={(e) => this.setState({ race: e.target.value })}
                name="race"
                type="radio"
                id="elf" />
                <Label for="elf">Elf</Label>
                <Input value="Orc"  onChange={(e) => this.setState({ race: e.target.value })}
                name="race"
                type="radio"
                id="orc" />
                <Label for="orc">Orc</Label>
            </FormGroup>
            <FormGroup onInput={(e) => this.fetchClasses(this.state.race)}>
              <Label htmlFor="class">Class:</Label>
                <Input value=""  onChange={(e) => this.setState({ class: e.target.value })}
                name="class"
                type="radio"
                id="none" />
                <Label for="none">None</Label>
                <Input value={this.state.classResponse[0].Name}  onChange={(e) => this.setState({ class: e.target.value })}
                name="class"
                type="radio"
                id="classOne" />
                <Label for="classOne">{this.state.classResponse[0].Name}</Label>
                <Input value={this.state.classResponse[1].Name}  onChange={(e) => this.setState({ class: e.target.value })}
                name="class"
                type="radio"
                id="classTwo" />
                <Label for="classTwo">{this.state.classResponse[1].Name}</Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isActive">
                Set this as your Active Character?
              </Label>
              <Input
                type="checkbox"
                onChange={this.toggleIsActive}
                name="isActive"
                checked={this.state.isActive}
              />
            </FormGroup>
            <Button type="submit">Create</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CharacterCreate;
