import React, {Component, Fragment} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from './AppBar';
import ArtistSearchContainer from '../containers/ArtistSearchContainer';
import LoginContainer from '../containers/LoginContainer';
import withSpotifyApi from '../hocs/SpotifyApi';
import { withStyles } from 'material-ui/styles';
import SelectedArtists from '../components/SelectedArtists';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import omit from 'lodash.omit';

const styles = (theme) => ({
    content: {
        padding: 20
    },
    button: {
        marginTop: theme.spacing.unit * 3
    }
});

class App extends Component {
    state = {
        auth: false,
        selectedArtists: {},
        newPlaylistName: ''
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
                                <Button color="primary" variant="raised" size="large" fullWidth className={classes.button}>
                                    Create new playlist
                                </Button>
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
