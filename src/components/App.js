import React, {Component} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import Login from './Login';
import withSpotifyApi from '../hocs/SpotifyApi';

class App extends Component {
    state = {
        auth: false
    };

    handleAuthorized(authCode) {
        console.log('auth code', authCode);
    }

    render() {
        const {spotifyApi} = this.props;
        return (
            <div>
                <CssBaseline/>
                <AppBar/>
                {this.state.auth
                    ? <ArtistSearchContainer/>
                    : <Login spotifyApi={spotifyApi} onAuthorize={this.handleAuthorized}/>
                }
            </div>
        );
    }
}

const redirectUri = "http://localhost:3000/callback.html";
const clientId = "fe25f2f0df964008b26bc9e34ed3496a";

export default withSpotifyApi(clientId, redirectUri)(App);
