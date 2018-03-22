import React, {Component} from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

class Login extends Component {
    componentDidMount() {
        this.addMessageListener();
    }

    addMessageListener = () => {
        window.addEventListener("message", (event) => {
            console.log(event);
            const message = event.data;
            if (message.type === 'spotify_access_code') {
                this.props.onAuthorize(message.code);
            }
        }, false);
    };

    openLoginWindow = () => {
        const {spotifyApi} = this.props;
        const state = "should-be-a-random-state-probably";
        const scopes = ['playlist-modify-public', 'user-top-read'];
        const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

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
            <Button variant="raised" color="primary" onClick={this.openLoginWindow}>
                Login
            </Button>
        );
    }
}

Login.propTypes = {
    spotifyApi: PropTypes.object.isRequired,
    onAuthorize: PropTypes.func.isRequired
};

export default Login;