import React, { Component } from 'react'
import { getFavorites, removeFavorites } from '../APIutils.js'

export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }

    componentDidMount = async() => {
        const favorites = await getFavorites(this.props.token);

        this.setState({ favorites })
    }

    handleDeleteClick = async(id) => {
        await removeFavorites(id, this.props.user.token);

        const favorites = await getFavorites(this.props.token);

        this.setState({ favorites })

    }
    render() {
        return (
            <div>
                <h2>My Favorites!</h2>
                <div className="characters">
                    {
                        this.state.favorites.map(fav => <div className="character">
                            <img src={fav.img} alt={fav.title}/>
                        <p>{fav.name}</p>
                        <p>Nickname: {fav.nickname}</p>
                        <p>Played By: {fav.portrayed}</p>
                        <button vaule={fav.id} onClick={() => this.handleDeleteClick(fav.id)}>Remove from favorite</button>
                    </div>
                            )
                    }
                </div>
            </div>
        )
    }
}