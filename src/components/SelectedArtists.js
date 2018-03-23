import React, {Component} from 'react';
import SelectedArtist from './SelectedArtist';
import PropTypes from 'prop-types';

import GridList from 'material-ui/GridList';

class SelectedArtists extends Component {
    render() {
        return (
            <GridList cellHeight={180}>
                {/*<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>*/}
                    {/*<Subheader component="div">December</Subheader>*/}
                {/*</GridListTile>*/}
                {this.props.artists.map(artist => (
                    <SelectedArtist name={artist.name} image={artist.imageHiRes} key={artist.id}/>
                ))}
            </GridList>
        );
    }
}

SelectedArtists.propTypes = {
    artists: PropTypes.array.isRequired
};

export default SelectedArtists;