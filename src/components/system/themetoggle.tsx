import { SunIcon, MoonIcon, Pointer } from "lucide-react"
import { Button } from "../ui/button"
import React, { useEffect } from "react";

export function ThemeToggle() {

  const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const handleToggleClick = () => {
    const element = document.documentElement
    element.classList.toggle('dark')

    const isDark = element.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {

    const isDarkCurrent = getThemePreference() === 'dark'
    document.documentElement.classList[isDarkCurrent ? 'add' : 'remove']('dark')
  
    if (typeof localStorage !== 'undefined') {
      const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
      })
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    }
    
    document.getElementById('themeToggle').addEventListener('click', handleToggleClick)

  },[]);

  return (
    <Button variant="ghost" size="icon" id="themeToggle" style={{cursor: 'pointer'}}>
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
