import React, {Component} from 'react';
import SelectedArtist from './SelectedArtist';
import PropTypes from 'prop-types';
import withWidth from 'material-ui/utils/withWidth';

import GridList from 'material-ui/GridList';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

class SelectedArtists extends Component {
    numCols = () => {
        const {width} = this.props;
        switch (width) {
            case 'xs':
                return 1;
            case 'sm':
                return 2;
            case 'md':
                return 3;
            case 'lg':
                return 4;
            case 'xl':
                return 5;
            default:
                return 1;
        }
    };

    render() {
        return (
            <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Selected Artists</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {Object.keys(this.props.artists).length > 0 &&
                        <GridList cellHeight={180} cols={this.numCols()} style={{flexGrow: 1}}>
                            {Object.values(this.props.artists).map(artist => (
                                <SelectedArtist
                                    name={artist.name}
                                    image={artist.imageHiRes}
                                    key={artist.id}
                                    onRemoveArtist={this.props.onRemoveArtist}
                                    id={artist.id}
                                />
                            ))}
                        </GridList>
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

SelectedArtists.propTypes = {
    artists: PropTypes.object.isRequired,
    onRemoveArtist: PropTypes.func.isRequired
};

export default withWidth()(SelectedArtists);