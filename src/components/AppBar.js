import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import GithubCircle from 'mdi-material-ui/GithubCircle';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

const styles = {
    flex: {
        flex: 1
    }
};

const AppBar = ({classes}) => (
    <MaterialAppBar position="static">
        <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
                SpotOn - A <a href="https://davidmoodie.com">David Moodie Project</a>
            </Typography>
            <Tooltip id="appbar-github" title="SpotOn GitHub repo">
                <IconButton
                    color="inherit"
                    component="a"
                    aria-labelledby="appbar-github"
                    href="https://github.com/davejm/SpotOn"
                >
                    <GithubCircle/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    </MaterialAppBar>
);

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);