import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB6ar8TSOdFXtXFvKa_fMZYjzvuRuJSsHs",
      authDomain: "instagramdemo-1ac57.firebaseapp.com",
      databaseURL: "https://instagramdemo-1ac57.firebaseio.com",
      projectId: "instagramdemo-1ac57",
      storageBucket: "instagramdemo-1ac57.appspot.com",
      messagingSenderId: "82169775506"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggenIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (<Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
    return <LoginForm />;
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
