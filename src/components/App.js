import React, {Component, Fragment} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import LoginContainer from '../containers/LoginContainer';
import withSpotifyApi from '../hocs/SpotifyApi';
import { withStyles } from 'material-ui/styles';
import SelectedArtists from '../components/SelectedArtists';

const styles = {
    content: {
        padding: 20
    }
};

class App extends Component {
    state = {
        auth: false,
        selectedArtists: {}
    };

    handleAuthorized = () => {
        console.log('authorized');
        this.setState({auth: true});
    };

    handleArtistAdd = (selection) => {
        console.log(selection);
        this.setState((prevState, props) => ({
            selectedArtists: {...prevState.selectedArtists, [selection.id]: selection}
        }));
    };

    render() {
        const {spotifyApi, classes} = this.props;
        return (
            <div>
                <CssBaseline/>
                <AppBar/>
                <div className={classes.content}>
                    {this.state.auth
                        ? (
                            <Fragment>
                                <ArtistSearchContainer spotifyApi={spotifyApi} onSelect={this.handleArtistAdd}/>
                                <SelectedArtists artists={this.state.selectedArtists}/>
                            </Fragment>
                        )
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
