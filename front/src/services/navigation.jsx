import React from 'react'
import Become from '../pages/become/become'
import Discover from '../pages/discover/discover'
import Login from '../pages/login/login'
import Signup from '../pages/signup/signup'
import Statistics from '../pages/statistics/statistics'

const SCREENS = {
  LOGIN: () => (<Login />),
  SIGNUP: () => (<Signup />),
  DISCOVER: () => (<Discover />),
  BECOME: () => (<Become />),
  STATISTICS: () => (<Statistics />),
}

export default SCREENS
