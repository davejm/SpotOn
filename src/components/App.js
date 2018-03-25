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
import Typography from 'material-ui/Typography';
import ReactGA from 'react-ga';

const redirectUri = (window.location.hostname === 'localhost')
    ? "http://localhost:3000/callback.html"
    : process.env.REACT_APP_PUBLIC_CALLBACK_URL;

const clientId = process.env.REACT_APP_CLIENT_ID;

const styles = (theme) => ({
    intro: {
        marginBottom: theme.spacing.unit * 4,
        textAlign: 'center'
    },
    content: {
        padding: 20,
        paddingTop: 40
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#76d275',
            main: '#43a047',
            dark: '#00701a',
            contrastText: '#fafafa',
        },
        secondary: {
            light: '#c3fdff',
            main: '#90caf9',
            dark: '#5d99c6',
            contrastText: '#fafafa',
        }
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
            openUrl: null,
            autoHideDuration: null
        }
    };

    componentDidMount() {
        const googleId = process.env.REACT_APP_GOOGLE_ID;
        if (googleId) {
            ReactGA.initialize(googleId);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }

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

    showNotification = (text, openUrl = null, autoHideDuration = 4000) => {
        // this.closeNotification();
        this.setState({
            notification: {
                open: true,
                text,
                openUrl,
                autoHideDuration
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
                        : (
                            <Fragment>
                                <div className={classes.intro}>
                                    <Typography variant='title' gutterBottom>What does this app do?</Typography>
                                    <Typography>
                                        This app allows you to quickly and easily create Spotify playlists based on the top tracks
                                        of your chosen artists.
                                    </Typography>
                                </div>
                                <LoginContainer spotifyApi={spotifyApi} onAuthorize={this.handleAuthorized} showNotification={this.showNotification}/>
                            </Fragment>
                        )
                    }
                </div>
                <FlashMessage
                    open={this.state.notification.open}
                    text={this.state.notification.text}
                    onClose={this.closeNotification}
                    openUrl={this.state.notification.openUrl}
                    autoHideDuration={this.state.notification.autoHideDuration}
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
