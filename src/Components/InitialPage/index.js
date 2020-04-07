import React from 'react';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";

import UserModal from "../UserModal";
import { css } from "@emotion/core";

import './InitialPage.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class InitialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      showModal: false,
      selectedUser: [],
    };
    this.showSettings = this.showSettings.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // mock server to get hardcoded data
    // https://www.mocky.io/
    axios.get('https://www.mocky.io/v2/5e8b67e12f00005a0088c274')
    .then((response) => {
      console.log(response);
      if (response && response.data && response.data.members)
      this.setState(prevState => ({
        users: response.data.members,
      }));
      setTimeout(() => {
        this.setState(prevState => ({
          loading: false,
        }));
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  showSettings (event) {
    event.preventDefault();
  }

  showModal(data) {
    this.setState(prevState => ({
      showModal: true,
      selectedUser: data,
    }));
  }

  closeModal() {
    this.setState(prevState => ({
      showModal: false,
    }));
  }

  // Create simple navbar for design purpose
  renderMenu() {
    return (
      <div className="nav-bar-slide">
        <div className="navbar">
          <a href="#default" id="logo">
          <i className="fa fa-tachometer"></i> Logo</a>
          <div id="navbar-right">
            <a className="active" href="#home">Home</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>
      </div>
    );
  }

  renderUserCard() {
    const { users } = this.state;

    if (users.length > 0) {
      return (
        <div className="list-page">
        {
          users.map((item, i) => {
            return (
              <div className="container" key={'flip-card' + i} onClick={() => this.showModal(item)}>
                <div className="container-img">
                  <img
                    src={require('../../Images/img' + (++i) + '.jpg')}
                    alt="Avatar"
                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                  />
                  <div className="user-name">{item.real_name}</div>
                  <div className="user-title">{item.tz}</div>
                  <div className="view-overlay">View More</div>
                </div>
              </div>
            );
          })
        }
        </div>
      );
    }

    return (
      <div>
       No user/s found.!
      </div>
    );
  }

  render() {
    const { loading, showModal, selectedUser } = this.state;
    if (loading) {
      return (
        <div className="sweet-loading">
          <ScaleLoader
            css={override}
            size={150}
            color={'#123abc'}
            loading={loading}
          />
        </div>
      );
    }

    return (
      <div>
        { this.renderMenu() }
        <div className="title-list">
          <div className="list-page-title"> User Log </div>
          {this.renderUserCard()}
        </div>
        {
          showModal &&
          <UserModal
            selectedUser={selectedUser}
            closeModal={this.closeModal}
          />
        }
      </div>
    );
  }
}

export default InitialPage;
