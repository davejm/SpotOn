import React, {Component, Fragment} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import LoginContainer from '../containers/LoginContainer';
import withSpotifyApi from '../hocs/SpotifyApi';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import SelectedArtists from '../components/SelectedArtists';
import TextField from 'material-ui/TextField';
import omit from 'lodash.omit';
import CreatePlaylistContainer from '../containers/CreatePlaylistContainer';
import FlashMessage from './FlashMessage';
import {compose} from 'recompose';
import green from 'material-ui/colors/green';

const redirectUri = (window.location.hostname === 'localhost')
    ? "http://localhost:3000/callback.html"
    : "https://davidmoodie.com/SpotOn/callback.html";

const clientId = "fe25f2f0df964008b26bc9e34ed3496a";

const styles = {
    content: {
        padding: 20,
        paddingTop: 40
    }
};

const theme = createMuiTheme({
    palette: {
        primary: green
    }
});

class App extends Component {
    state = {
        auth: false,
        selectedArtists: {},
        newPlaylistName: '',
        notification: {
            open: false,
            text: '',
            openUrl: null
        }
    };

    handleAuthorized = () => {
        // console.log('authorized');
        this.setState({auth: true});
    };

    handleArtistAdd = (selection) => {
        // console.log(selection);
        this.setState((prevState, props) => ({
            selectedArtists: {...prevState.selectedArtists, [selection.id]: selection}
        }));
    };

    handlePlaylistNameChange = (event) => {
        this.setState({
            newPlaylistName: event.target.value
        });
    };

    handleRemoveArtist = (id) => {
        this.setState((prevState, props) => ({
            selectedArtists: omit(prevState.selectedArtists, id)
        }))
    };

    selectedArtistIds = () => (
        Object.keys(this.state.selectedArtists)
    );

    showNotification = (text, openUrl = null) => {
        this.setState({
            notification: {
                open: true,
                text,
                openUrl
            }
        });
    };

    closeNotification = () => {
        this.setState((prevState, props) => ({
            notification: {
                ...prevState.notification,
                open: false
            }
        }))
    };

    render() {
        const {spotifyApi, classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar/>
                <div className={classes.content}>
                    {this.state.auth
                        ? (
                            <Fragment>
                                <ArtistSearchContainer spotifyApi={spotifyApi} onSelect={this.handleArtistAdd}/>
                                <SelectedArtists artists={this.state.selectedArtists} onRemoveArtist={this.handleRemoveArtist}/>
                                <TextField
                                    id="newPlaylistName"
                                    label="New playlist name"
                                    value={this.state.newPlaylistName}
                                    onChange={this.handlePlaylistNameChange}
                                    margin="normal"
                                    required
                                    fullWidth
                                />
                                <CreatePlaylistContainer
                                    spotifyApi={spotifyApi}
                                    artistIds={this.selectedArtistIds()}
                                    playlistName={this.state.newPlaylistName}
                                    showNotification={this.showNotification}
                                />
                            </Fragment>
                        )
                        : <LoginContainer spotifyApi={spotifyApi} onAuthorize={this.handleAuthorized} showNotification={this.showNotification}/>
                    }
                </div>
                <FlashMessage
                    open={this.state.notification.open}
                    text={this.state.notification.text}
                    onClose={this.closeNotification}
                    openUrl={this.state.notification.openUrl}
                />
            </MuiThemeProvider>
        );
    }
}

const enhance = compose(
    withStyles(styles),
    withSpotifyApi(clientId, redirectUri)
);

export default enhance(App);
