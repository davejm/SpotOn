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
            const image = item.images.length > 0 ? item.images[item.images.length - 1].url : null;
            return {
                name: item.name,
                image
            };
        });
    }

    searchArtist = async (query) => {
        const {spotifyApi} = this.props;
        try {
            const res = await spotifyApi.searchArtists(query, {limit: 10});
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
            />
        );
    }
}

ArtistSearchContainer.propTypes = {
    spotifyApi: PropTypes.object.isRequired
};

export default ArtistSearchContainer;