import Login from "./login"
import Home from "./home"

const [screen, setScreen] = React.useState(SCREENS.LOGIN)

const SCREENS = {
    LOGIN: () => (<Login />),
    HOME: () => (<Home />),
}

module.exports = {
    screen,
    setScreen,
    SCREENS,
}