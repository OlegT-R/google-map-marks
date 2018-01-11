import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export default class Input extends React.PureComponent {
    static propTypes = {
        onChanged: PropTypes.func,
        onInput: PropTypes.func,
        onBlur: PropTypes.func,
        className: PropTypes.string,
        autofocus: PropTypes.bool,
        clearAfterChanged: PropTypes.bool,
        placeholder: PropTypes.string,
        inputRef: PropTypes.func,
    };

    static defaultProps = {
        autofocus: false,
        clearAfterChanged: false
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
        this.onInput = this.onInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onBlur() {
        this.props.onBlur && this.props.onBlur();
        this.setState({focused: false});
    }

    onFocus() {
        this.setState({focused: true});
    }

    onInput() {
        this.props.onInput && this.props.onInput(this.input.value);
    }

    onKeyPress(e) {
        if (e.which === 13 || e.key === 'Enter') {
            this.props.onChanged && this.props.onChanged(this.input.value);
            this.props.clearAfterChanged && (this.input.value = '');
        }
    }

    render() {
        const {className, inputRef, autofocus, placeholder} = this.props;
        let classes = this.state.focused ? 'input focused ' : 'input ';
        className && (classes += className);
        return (
            <div className={classes}>
                <input type="text"
                       ref={(input) => {
                           this.input = input;
                           inputRef && inputRef(input);
                       }}
                       onBlur={this.onBlur}
                       onFocus={this.onFocus}
                       onInput={this.onInput}
                       onKeyPress={this.onKeyPress}
                       autoFocus={autofocus}
                       placeholder={placeholder}
                />
                <div className="focus-line"/>
            </div>
        );
    }
}
