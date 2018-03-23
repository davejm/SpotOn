import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../components/Login";

function unixSeconds() {
    return Math.round(Number(new Date()) / 1000);
}

class LoginContainer extends Component {
    componentDidMount() {
        const savedToken = this.getValidAccessToken();
        if (savedToken) {
            this.props.spotifyApi.setAccessToken(savedToken);
            this.props.onAuthorize();
        } else {
            this.addMessageListener();
        }
    }

    addMessageListener = () => {
        window.addEventListener("message", (event) => {
            // console.log(event);
            const message = event.data;
            if (message.type === 'spotify_access_token') {
                // console.log("access token", message);
                this.props.spotifyApi.setAccessToken(message.access_token);
                this.saveAccessToken(message.access_token, Number(message.expires_in));
                this.props.onAuthorize();
            } else if (message.type === 'spotify_login_error') {
                this.props.showNotification('Error logging in - ' + message.error);
            }
        }, false);
    };

    saveAccessToken = (token, expiresIn) => {
        localStorage.setItem('spotifyAuth', JSON.stringify({
            accessToken: token,
            expireTime: unixSeconds() + expiresIn
        }))
    };

    getValidAccessToken = () => {
        const spotifyAuth = localStorage.getItem('spotifyAuth');
        if (spotifyAuth) {
            const authObj = JSON.parse(spotifyAuth);

            // Check that the auth token has at least 5 mins (60*5) before expiration
            if (authObj.expireTime - unixSeconds() >= 300) {
                return authObj.accessToken;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    openLoginWindow = () => {
        const {spotifyApi} = this.props;
        const state = "should-be-a-random-state-probably";
        const scopes = ['playlist-modify-public', 'user-top-read'];

        // Create implicit auth URL (currently depending on spotify api node fork for the implicit flag)
        const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, false, true);

        const width = 450,
            height = 730,
            left = (window.screen.width / 2) - (width / 2),
            top = (window.screen.height / 2) - (height / 2);

        window.open(authorizeURL,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    };

    render() {
        return (
            <Login onClick={this.openLoginWindow}/>
        );
    }
}

LoginContainer.propTypes = {
    spotifyApi: PropTypes.object.isRequired,
    onAuthorize: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
};

export default LoginContainer;