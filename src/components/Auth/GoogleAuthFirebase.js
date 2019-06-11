import React, { Component } from "react";
import { connect } from "react-redux";
import { signInGoogle, signOut } from "../../actions/authActions";
import { Icon } from "antd";

class GoogleAuth extends Component {
  state = {
    isSigningIn: false,
    isSigningOut: false
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      isSigningIn: false,
      isSigningOut: false
    });
  }
  onSignInClick = async () => {
    await this.setState({ isSigningIn: true, isSigningOut: false });
    setTimeout(() => {
      this.props.signInGoogle().then(() => {
        this.setState({ isSigningIn: false, isSigningOut: false });
      });
    }, 1000);
  };

  onSignOutClick = async () => {
    await this.setState({ isSigningIn: false, isSigningOut: true });
    setTimeout(() => {
      this.props.signOut().then(() => {
        this.setState({ isSigningIn: false, isSigningOut: false });
      });
    }, 1000);
  };

  renderButtonText = () => {
    if (this.state.isSigningOut || this.state.isSigningIn) {
      return (
        <Icon
          style={{
            fontSize: "1.2rem"
          }}
          type="loading"
        />
      );
    } else {
      return <span>Sign Out</span>;
    }
  };

  renderAuthButton(style) {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          style={style}
          className="ui google plus button"
          onClick={this.onSignOutClick}
        >
          <i className="google plus icon" />
          {this.renderButtonText()}
        </button>
      );
    } else {
      return (
        <button
          style={style}
          className="ui google plus button"
          onClick={this.onSignInClick}
        >
          <i className="google plus icon" /> Sign In with Google
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton(this.props.style);
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { signInGoogle, signOut }
)(GoogleAuth);
