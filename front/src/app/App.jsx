import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopBar from '../components/top-bar/top-bar'
import Home from '../pages/home/home'
import SCREENS from '../services/navigation'
import styles from './app.css'

const App = () => (
  <div className={styles.container}>
    <BrowserRouter>
      <TopBar />
      <Switch>
        <Route path="/login" exact component={SCREENS.LOGIN} />
        <Route path="/signup" exact component={SCREENS.SIGNUP} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
