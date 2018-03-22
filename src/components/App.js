import React, {Component} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import Login from './Login';

import SpotifyWebApi from 'spotify-web-api-node';

class App extends Component {
    state = {
        auth: false,
        spotifyApi: null
    };

    componentDidMount() {
        this.initSpotifyApi();
    }

    initSpotifyApi = () => {
        const redirectUri = "http://localhost:3000/callback.html";
        const clientId = "fe25f2f0df964008b26bc9e34ed3496a";

        const spotifyApi = new SpotifyWebApi({
            redirectUri,
            clientId
        });
        console.log("spot api", spotifyApi);
        this.setState({spotifyApi: spotifyApi});
    };

    handleAuthorized(authCode) {
        console.log('auth code', authCode);
    }

    render() {
        return (
            <div>
                <CssBaseline/>
                <AppBar/>
                {this.state.auth
                    ? <ArtistSearchContainer/>
                    : this.state.spotifyApi && <Login spotifyApi={this.state.spotifyApi} onAuthorize={this.handleAuthorized}/>
                }
            </div>
        );
    }
}

export default App;
