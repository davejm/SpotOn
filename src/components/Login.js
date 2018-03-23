import React, {Component} from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

class Login extends Component {
    render() {
        return (
            <Button variant="raised" color="primary" onClick={this.props.onClick}>
                Login
            </Button>
        );
    }
}

Login.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Login;