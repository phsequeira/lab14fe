import React, { Component } from 'react'
import { searchCharacters, addFavorite, getFavorites } from '../APIutils.js';
export default class CharacterSearchPage extends Component {
    state = {
        characters: {},
        favorites: [],
        search: ''
    }

    componentDidMount = async() => {
        await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.user.token);

        this.setState({ favorites })

    }
    doSearch = async () => {
        const data = await searchCharacters(this.state.search);

        this.setState({ characters: data });
    }

    handleSubmit = async e => {
        e.preventDefault();

        await this.doSearch();
    }

    handleFavoriteClick = async (rawCharacter) => {
        const favoriteCharacter = {
            name: rawCharacter.name,
            nickname: rawCharacter.nickname,
            portrayed: rawCharacter.portrayed,
            img: rawCharacter.img
        }
        await addFavorite(favoriteCharacter, this.props.user.token);

        await this.fetchFavorites();
    }


    handleSearchChange = e => this.setState({ search: e.target.value })

    isAFavorite = (character) => {


        const isIsFavorites = this.state.favorites.find(favorite => favorite.name === character.name);

        return Boolean(isIsFavorites);
    }

    render() {  
        const characters = Array.from(this.state.characters)
        return (
            <div className='search'>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.search} onChange={this.handleSearchChange} />
                    <button>Search for Characters</button>
                </form>
                <div className="characters">
                {characters.map((character, i) => 
                    <div key={i} className="character">
                        <img src={character.img} alt={character.title}/>
                        <p>{character.name}</p>
                        <p>Nickname: {character.nickname}</p>
                        <p>Played By: {character.portrayed}</p>
                        <p>{
                            this.isAFavorite(character)
                            ? '👍👍👍'
                            : <button onClick={() => this.handleFavoriteClick(character)}>Add to favorite</button>}
                            </p>
                    </div>)
                }
                </div>
            </div>)
   }
}