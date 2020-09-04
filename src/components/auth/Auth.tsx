import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

type AuthState = {
  sessionToken: string | null;
  login: boolean;
  modal: boolean;
};

type AuthProps = {
  token?: String | null;
};

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      sessionToken: "",
      login: false,
      modal: false,
    };
  }

  title() {
    return this.state.login ? "Login" : "Signup";
  }

  loginToggle = (event: React.MouseEvent) => {
    event.preventDefault();

    this.setState({
      login: !this.state.login,
    });
  }

  updateToken(newToken: string) {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  toggle() {
    return this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <Button onClick={this.toggle}>Not Signed In?</Button>
          {!this.state.login ? (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.title()}</ModalHeader>
              <ModalBody>
                <Signup updateToken={this.updateToken} toggle={this.toggle} />
                {/* here we pass both the updateToken and toggle functions */}
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.loginToggle}>
                  {!this.state.login ? "Login" : "Signup"}
                </Button>
              </ModalFooter>
            </Modal>
          ) : (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.title()}</ModalHeader>
              <ModalBody>
                <Login updateToken={this.updateToken} toggle={this.toggle} />
                {/* here we pass both the updateToken and toggle functions */}
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.loginToggle}>
                  {this.state.login ? "Signup" : "Login"}
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;
