import React, {Component, Fragment} from 'react';
import SpotifyWebApi from "spotify-web-api-node";

const withSpotifyApi = (clientId, redirectUri) => (WrappedComponent) => {
    return class extends Component {
        state = {
            spotifyApi: null
        };

        componentDidMount() {
            this.initSpotifyApi();
        }

        initSpotifyApi = () => {
            const spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId
            });
            // console.log("spot api", spotifyApi);
            this.setState({spotifyApi: spotifyApi});
        };

        render() {
            return (
                <Fragment>
                    {this.state.spotifyApi &&
                        <WrappedComponent
                            {...this.props}
                            spotifyApi={this.state.spotifyApi}
                        />
                    }
                </Fragment>
            )
        }
    }
};

export default withSpotifyApi;