import React, {Component} from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class Login extends Component {
    render() {
        return (
            <div>
                <Typography align="center" variant="title">You must first securely login with your Spotify account to use this app.</Typography>
                <Button variant="raised" color="primary" size="large" onClick={this.props.onClick} style={{display: 'block', margin: '0 auto', marginTop: 22}}>
                    Login
                </Button>
            </div>
        );
    }
}

Login.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Login;