import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import { ThemeProvider } from './contexts/themeSwitcher.js'
import { useState, useEffect } from 'react'

function Layout() {
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? storedTheme : 'light';
  });

  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export default Layout
