import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class FlashMessage extends React.Component {
    handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        this.props.onClose();
    };

    render() {
        const { classes, openUrl, autoHideDuration } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.props.open}
                autoHideDuration={autoHideDuration}
                onClose={this.handleClose}
                SnackbarContentProps={{
                    'aria-describedby': 'app-notification',
                }}
                message={<span id="app-notification">{this.props.text}</span>}
                action={
                    <Fragment>
                        {openUrl &&
                            <Button key="open" color="secondary" size="small" component="a" href={openUrl} target="_blank" rel="noreferrer noopener">
                                OPEN
                            </Button>
                        }
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Fragment>
                }
                key={this.props.text + (new Date())}
            />
        );
    }
}

FlashMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    openUrl: PropTypes.string,
    autoHideDuration: PropTypes.number
};

export default withStyles(styles)(FlashMessage);