import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { GridListTile, GridListTileBar } from 'material-ui/GridList';

class SelectedArtist extends Component {
    render() {
        const {name, image, ...others} = this.props;
        return (
            <GridListTile {...others}>
                <img src={image} alt={name} />
                <GridListTileBar title={name}/>
            </GridListTile>
        );
    }
}

SelectedArtist.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string
};

export default SelectedArtist;