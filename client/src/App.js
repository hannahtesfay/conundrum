import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

import { useDarkMode } from './components/dark-mode/useDarkMode'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/dark-mode/globalStyles";
import { lightTheme, darkTheme } from "./components/dark-mode/Themes"

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import SinglePost from './pages/SinglePost'
import { AuthProvider } from './context/auth'
import AuthRoute from './utilities/AuthRoute'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App({ location }) {

  const [theme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <AuthProvider>
        <Wrapper>
          <Container style={{margin: 40}}>
            <MenuBar/>
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home}/>
                    <AuthRoute exact path="/login" component={Login}/>
                    <AuthRoute exact path="/register" component={Register}/>
                    <Route exact path="/posts/:postId" component={SinglePost}/>
                  </Switch>
              </CSSTransition>
            </TransitionGroup>
          </Container>
        </Wrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}


const Wrapper = styled.div`
.fade-enter {
  opacity: 0.01;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit.fade-exit-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
`;

export default withRouter(App);
