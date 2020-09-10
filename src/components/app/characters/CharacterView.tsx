import React from 'react';
import Character from '../types/Character';

//TODO: In current state this will be a component to display the currently activeCharacter. Will make CharacterView2 th reviewing

type ViewState = {

}

type ViewProps = {
    token: string,
    activeCharacter: Character
}


class CharacterView extends React.Component<ViewProps, ViewState> {
    constructor(props: ViewProps){
        super(props)
        this.state = {

        }
    }

    //Component Functions here

    render(){
        return(
            <div></div>
        )
    }
}

export default CharacterView;