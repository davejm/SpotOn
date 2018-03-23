import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import Tooltip from 'material-ui/Tooltip';

import { GridListTile, GridListTileBar } from 'material-ui/GridList';

class SelectedArtist extends Component {
    handleRemoveArtist = () => {
        this.props.onRemoveArtist(this.props.id);
    };

    render() {
        const {name, image, onRemoveArtist, id, ...others} = this.props;
        return (
            <GridListTile {...others}>
                <img src={image} alt={name} />
                <GridListTileBar
                    title={name}
                    actionIcon={
                        <Tooltip title="Remove artist">
                            <IconButton style={{color: 'rgba(255, 0, 0, 0.78)'}} onClick={this.handleRemoveArtist}>
                                <RemoveCircleIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                />
            </GridListTile>
        );
    }
}

SelectedArtist.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    onRemoveArtist: PropTypes.func.isRequired,
    // id: PropTypes.number.isRequired
};

export default SelectedArtist;