import React from 'react';
import './character.css'


export default class CharacterList extends React.Component {          
            
    

    render() {
    const characters = Array.from(this.props.characters)
    return (
        <div className='characters'>  
          
            {characters.map((character, i) => <div className='character' key={i}>

            <img src={character.img} alt={character.name}/>
                    <p>{character.name}</p>
                    <p>Nickname: {character.nickname}</p>
                    <p>Played By: {character.portrayed}</p>
                    <p>{
                        this.isAFavorite(character) 
                            ? '👍👍👍' 
                            :  <button onClick={() => this.handleFavoriteClick(character)}>Make favorite</button>}
                        </p>
    
          </div>)}
        
        </div>
    )
    }
}