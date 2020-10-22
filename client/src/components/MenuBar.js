import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

import { useDarkMode } from './dark-mode/useDarkMode'
import { ThemeProvider } from "styled-components";
import Toggle from "./dark-mode/Toggler"
import { GlobalStyles } from "./dark-mode/globalStyles";
import { lightTheme, darkTheme } from "./dark-mode/Themes"

function MenuBar() {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path);

    const [theme, themeToggler] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;


    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
      <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
        <Menu pointing secondary size="massive" color="teal" fluid>
        <Menu.Item
          name={`Hi ${user.username} 👋`}
          active
          as={Link}
          to="/"
          homelink
        />
        <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={logout}
        />
        <Menu.Item>
            <Toggle theme={theme} toggleTheme={themeToggler}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </ThemeProvider>
    ) : (
      <ThemeProvider theme={themeMode}>
          <GlobalStyles/>
          <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
            <Menu.Item className="toggleItem">
              <Toggle theme={theme} toggleTheme={themeToggler}/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </ThemeProvider>
    )

    return menuBar;
}

export default MenuBar;