import React, {Component} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import LoginContainer from '../containers/LoginContainer';
import withSpotifyApi from '../hocs/SpotifyApi';
import { withStyles } from 'material-ui/styles';

const styles = {
    content: {
        padding: 20
    }
};

class App extends Component {
    state = {
        auth: false
    };

    handleAuthorized = () => {
        console.log('authorized');
        this.setState({auth: true});
    };

    render() {
        const {spotifyApi, classes} = this.props;
        return (
            <div>
                <CssBaseline/>
                <AppBar/>
                <div className={classes.content}>
                    {this.state.auth
                        ? <ArtistSearchContainer spotifyApi={spotifyApi}/>
                        : <LoginContainer spotifyApi={spotifyApi} onAuthorize={this.handleAuthorized}/>
                    }
                </div>
            </div>
        );
    }
}

const redirectUri = "http://localhost:3000/callback.html";
const clientId = "fe25f2f0df964008b26bc9e34ed3496a";

export default withSpotifyApi(clientId, redirectUri)(withStyles(styles)(App));
