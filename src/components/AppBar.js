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
            <Typography variant="title" className={classes.flex} color='inherit' noWrap>
                <span>Top Playlist for Spotify - </span>
                <a
                    href="https://davidmoodie.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{color: 'inherit', opacity: 0.7}}
                >
                    David Moodie
                </a>
            </Typography>
            <Tooltip id="appbar-github" title="Top Playlist GitHub repo">
                <IconButton
                    color="inherit"
                    component="a"
                    aria-labelledby="appbar-github"
                    href="https://github.com/davejm/top-playlist"
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