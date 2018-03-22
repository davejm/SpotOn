import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import {ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const renderInput = (inputProps) => {
    const { classes, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div" style={{height: 'auto'}}>
            <Avatar src="https://material-ui-next.com/static/images/remy.jpg"/>
            <ListItemText>
                <Fragment>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </strong>
                        );
                    })}
                </Fragment>
            </ListItemText>
        </MenuItem>
    );
};

const renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
};

const getSuggestionValue = (suggestion) => {
    return suggestion.label;
};

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 250,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});

const ArtistSearch = (props) =>  (
    <Autosuggest
        theme={{
            container: props.classes.container,
            suggestionsContainerOpen: props.classes.suggestionsContainerOpen,
            suggestionsList: props.classes.suggestionsList,
            suggestion: props.classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={props.suggestions}
        onSuggestionsFetchRequested={props.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={props.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
            classes: props.classes,
            placeholder: 'Search a country (start with a)',
            value: props.value,
            onChange: props.handleChange,
        }}
    />
);

ArtistSearch.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSuggestionsFetchRequested: PropTypes.func.isRequired,
    handleSuggestionsClearRequested: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ArtistSearch);