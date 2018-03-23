import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

const styles = (theme) => ({
    button: {
        marginTop: theme.spacing.unit * 3
    }
});

class CreatePlaylist extends Component {
    render() {
        return (
            <Button color="primary" variant="raised" size="large" fullWidth className={this.props.classes.button} onClick={this.props.onClick}>
                Create new playlist
            </Button>
        );
    }
}

CreatePlaylist.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(CreatePlaylist);