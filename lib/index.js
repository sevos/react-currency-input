'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mask = require('./mask.js');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CurrencyInput = _react2.default.createClass({
    displayName: 'CurrencyInput',


    /**
     * Prop validation.  See:  https://facebook.github.io/react/docs/component-specs.html#proptypes
     */
    propTypes: {
        onChange: _react.PropTypes.func,
        value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        decimalSeparator: _react.PropTypes.string,
        thousandSeparator: _react.PropTypes.string,
        precision: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        inputType: _react.PropTypes.string
    },

    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#getdefaultprops
     *
     * Invoked once and cached when the class is created. Values in the mapping will be set on this.props if that
     * prop is not specified by the parent component
     *
     * @returns {{onChange: onChange, value: string, decimalSeparator: string, thousandSeparator: string, precision: number}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            onChange: function onChange(maskValue) {/*no-op*/},
            value: "0",
            decimalSeparator: ".",
            thousandSeparator: ",",
            precision: "2",
            inputType: "text"
        };
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#getinitialstate
     *
     * Invoked once before the component is mounted. The return value will be used as the initial value of this.state
     *
     * @returns {{maskedValue, customProps: *}}
     */
    getInitialState: function getInitialState() {
        var customProps = Object.assign({}, this.props); //polyfilled for environments that do not support it.
        delete customProps.onChange;
        delete customProps.value;
        delete customProps.decimalSeparator;
        delete customProps.thousandSeparator;
        delete customProps.precision;
        delete customProps.inputType;
        return {
            maskedValue: (0, _mask2.default)(this.props.value, this.props.precision, this.props.decimalSeparator, this.props.thousandSeparator),
            customProps: customProps
        };
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
     *
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * @param nextProps
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var customProps = Object.assign({}, nextProps); //polyfilled for environments that do not support it.
        delete customProps.onChange;
        delete customProps.value;
        delete customProps.decimalSeparator;
        delete customProps.thousandSeparator;
        delete customProps.precision;
        delete customProps.inputType;
        this.setState({
            maskedValue: (0, _mask2.default)(nextProps.value, nextProps.precision, nextProps.decimalSeparator, nextProps.thousandSeparator),
            customProps: customProps
        });
    },


    /**
     * Exposes the current masked value.
     *
     * @returns {*}
     */
    getMaskedValue: function getMaskedValue() {
        return this.state.maskedValue;
    },


    /**
     * onChange Event Handler
     * @param event
     */
    handleChange: function handleChange(event) {
        event.preventDefault();
        var maskedValue = (0, _mask2.default)(event.target.value, this.props.precision, this.props.decimalSeparator, this.props.thousandSeparator);
        this.setState({ maskedValue: maskedValue });
        this.props.onChange(maskedValue);
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
     * @returns {XML}
     */
    render: function render() {
        return _react2.default.createElement('input', _extends({
            type: this.props.inputType,
            value: this.state.maskedValue,
            onChange: this.handleChange
        }, this.state.customProps));
    }
});

exports.default = CurrencyInput;