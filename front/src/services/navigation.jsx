import React from 'react'
import Become from '../pages/become/become'
import Discover from '../pages/discover/discover'
import Login from '../pages/login/login'
import Signup from '../pages/signup/signup'

const SCREENS = {
  LOGIN: () => (<Login />),
  SIGNUP: () => (<Signup />),
  DISCOVER: () => (<Discover />),
  BECOME: () => (<Become />),
}

export default SCREENS
