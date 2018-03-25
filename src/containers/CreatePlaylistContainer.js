import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CreatePlaylist from '../components/CreatePlaylist';

function chunkify(arr, n) {
    const chunks = [];

    for (let i = 0; i < arr.length; i += n) {
        const tempArray = arr.slice(i, i + n);
        chunks.push(tempArray);
    }
    return chunks;
}

function flatten(arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
        const value = arr[i];
        if (Array.isArray(value)) {
            flatten(value, result);
        } else {
            result.push(value);
        }
    }
    return result;
}

class CreatePlaylistContainer extends Component {
    getUserId = async () => {
        const res = await this.props.spotifyApi.getMe();
        return res.body.id;
    };

    getTracks = async () => {
        const {spotifyApi, artistIds} = this.props;

        // Send off the spotifyApi calls for top tracks in parallel. These may complete in an order different to the
        // artist order in the UI, but they can be reordered afterwards.
        const trackUrisDeep = await Promise.all(artistIds.map(async (artistId) => {
            // console.log('sent request for id', artistId);
            const res = await spotifyApi.getArtistTopTracks(artistId, 'GB');
            // console.log(res);
            return res.body.tracks.map(track => track.uri);

            // TODO: Use trackUrisByArtist map so I can reorder tracks back to corresponding artist order after API requests
        }));

        return flatten(trackUrisDeep);
    };

    createPlaylist = async (userId) => {
        const {spotifyApi, playlistName} = this.props;
        const res = await spotifyApi.createPlaylist(userId, playlistName, {public: true});
        return {
            playlistId: res.body.id,
            playlistUrl: res.body.external_urls.spotify
        };
    };

    addTracksToPlaylist = async (userId, playlistId, trackUris) => {
        const {spotifyApi} = this.props;

        // The Spotify API can only add 100 tracks at a time
        const chunks = chunkify(trackUris, 100);

        // Add chunks of tracks to playlist in sequence so as to ensure track order
        for (let chunk of chunks) {
            await spotifyApi.addTracksToPlaylist(userId, playlistId, chunk);
        }
    };

    create = async () => {
        const {showNotification, playlistName, onSuccess} = this.props;
        if (playlistName === '') {
            showNotification('Playlist name cannot be empty');
            return;
        }

        showNotification('Creating...');
        const userId = await this.getUserId();
        const trackUris = await this.getTracks();
        const {playlistId, playlistUrl} = await this.createPlaylist(userId);
        await this.addTracksToPlaylist(userId, playlistId, trackUris);
        showNotification('Successfully created playlist', playlistUrl, null);
        onSuccess();
    };

    render() {
        return (
            <CreatePlaylist onClick={this.create}/>
        )
    }
}

CreatePlaylistContainer.propTypes = {
    spotifyApi: PropTypes.object.isRequired,
    artistIds: PropTypes.array.isRequired,
    playlistName: PropTypes.string.isRequired,
    showNotification: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};

export default CreatePlaylistContainer;