import React, {Component} from 'react';
import ArtistSearch from '../components/ArtistSearch';
import PropTypes from "prop-types";

class ArtistSearchContainer extends Component {
    state = {
        value: '',
        suggestions: [],
    };

    parseArtistSearchResponse(res) {
        return res.body.artists.items.map((item) => {
            const imageHiRes = item.images.length > 0 ? item.images[0].url : null;
            const imageLowRes = item.images.length > 0 ? item.images[item.images.length - 1].url : null;
            return {
                name: item.name,
                imageLowRes,
                imageHiRes,
                id: item.id
            };
        });
    }

    searchArtist = async (query) => {
        const {spotifyApi} = this.props;
        try {
            const res = await spotifyApi.searchArtists(query, {limit: 6});
            console.log(res);
            return this.parseArtistSearchResponse(res);
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    handleSuggestionsFetchRequested = async ({ value }) => {
        this.setState({
            suggestions: await this.searchArtist(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        return (
            <ArtistSearch
                handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                handleSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                handleChange={this.handleChange}
                value={this.state.value}
                suggestions={this.state.suggestions}
                onSelect={this.props.onSelect}
            />
        );
    }
}

ArtistSearchContainer.propTypes = {
    spotifyApi: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default ArtistSearchContainer;