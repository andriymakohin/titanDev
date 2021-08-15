import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.scrollTo({ top: 0 });
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handkeCLick = () => {
    this.props.onClose();
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return (
      <>
        <div onClick={this.handkeCLick} className="Overlay"></div>
        <div className="Modal">{this.props.persone || this.props.children }</div>
      </>
    );
  }
}
