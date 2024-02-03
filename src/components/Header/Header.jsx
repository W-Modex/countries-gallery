import React from 'react'
import useTheme from '../../contexts/themeSwitcher'
import { FaMoon } from 'react-icons/fa';

function Header() {
  const {themeMode, lightTheme, darkTheme} = useTheme();

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
      }

  return (
    <div className='w-full h-16 bg-white dark:bg-darkElem dark:text-white fixed'>
      <div className='max-w-[95%] h-full flex justify-between ml-[2.5%]'>
        <h2 className='my-4 font-extrabold text-xl lg:text-2xl cursor-default'>Where in the world?</h2>
        <label htmlFor="theme" className="flex my-4 items-center justify-center">
          <input type="checkbox" name="theme" id="theme" className="sr-only" onChange={onChangeBtn} checked={themeMode === 'dark'} />
          <p className="my-5 font-extrabold cursor-pointer"><FaMoon className='inline' /> Dark Mode</p>
        </label>

      </div>
    </div>
  )
}

export default Header