import Navbar from "./navbar"
import SCREENS from "./navigation"
import ReactDOM from "react-dom"
import React from "react"

const htmlRoot = document.getElementById('root')

const Principal = () => {
  const [screen, setScreen] = React.useState(SCREENS.LOGIN)

  return (
    <div>
      <Navbar />
      {screen}
    </div>
  )
}

module.exports = {
  setScreen,
}

ReactDOM.render(
  <Principal />,
  htmlRoot,
)