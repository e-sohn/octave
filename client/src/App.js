import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { loginUser, createUser, updateToken } from './services/helper';
import { withRouter } from 'react-router'
import decode from 'jwt-decode'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        picture:'',
        id: '',
      },
      isLoggedIn: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    if (token) {
      const user = decode(token)
      this.setState({
        user,
        isLoggedIn: true
       })
       this.props.history.push('/home')
    }
  }

  async handleLogin(userData) {
    const resp = await loginUser(userData)
    console.log(resp)
    localStorage.setItem('token', resp.token)
    await updateToken(resp.token);
    if (resp.token !== null) {
      this.setState({
        user: resp.userData,
        isLoggedIn: true
       })
    } else {
      this.setState({ isLoggedIn: false });
    }
    this.props.history.push('/home')
  }

  async handleRegister(userData) {
    const newUser = await createUser({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    this.handleLogin(userData)

    await updateToken(newUser.token);
    if (newUser) {
      this.props.history.push(`/home/`);
    }
  }

  handleLogout() {
    this.setState({
      user: {
        name: '',
        picture:'',
        id: '',
      },
      isLoggedIn: false,
    })
  }

  render() {
    const { isLoggedIn, token, user } = this.state
    return (
      <div className='App'>
        <Header
          handleLogout={this.handleLogout}
          isLoggedIn={isLoggedIn}
          token={this.state.token}
          user={this.state.user} />
        <Main
          isLoggedIn={isLoggedIn}
          handleLogin={this.handleLogin}
          handleRegister={this.handleRegister}
          token={token}
          user={user}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
