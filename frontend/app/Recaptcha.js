// From https://github.com/appleboy/react-recaptcha
'use strict';

var React = require('react');

var Recaptcha = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    CallbackName: React.PropTypes.string,
    elementID: React.PropTypes.string,
    onloadCallback: React.PropTypes.func,
    verifyCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      elementID: 'g-recaptcha',
      onloadCallback: undefined,
      onloadCallbackName: 'onloadCallback',
      verifyCallback: undefined,
      render: 'onload',
      theme: 'light',
      type: 'image'
    };
  },

  render: function() {
    if (this.props.render == 'explicit' && this.props.onloadCallback) {
      window[this.props.onloadCallbackName] = function () {
        grecaptcha.render(this.props.elementID, {
          'sitekey': this.props.sitekey,
          'callback': (this.props.verifyCallback) ? this.props.verifyCallback : undefined,
          'theme': this.props.theme,
          'type': this.props.type
        });

        if (this.props.onloadCallback) {
          this.props.onloadCallback();
        }
      }.bind(this);
      return (
        <div id={this.props.elementID}
          data-onloadcallbackname={this.props.onloadCallbackName}
          data-verifycallbackname={this.props.verifyCallbackName}
          >
        </div>
      );
    } else {
      return (
        <div className='g-recaptcha'
          data-sitekey={this.props.sitekey}
          data-theme={this.props.theme}
          data-type={this.props.type}
          >
        </div>
      );
    }
  }
});

module.exports = Recaptcha;
