import { useEffect, useState } from 'react'
import Login from './Login'
import Search from './Search'
import './App.css'

function App() {
  const [token] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('token') || localStorage.getItem('token')
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenParam = params.get('token')

    if (tokenParam) {
      localStorage.setItem('token', tokenParam)
      params.delete('token')

      const newSearch = params.toString()
      const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`
      window.history.replaceState({}, document.title, newUrl)
    }
  }, [])

  if (!token) {
    return <Login />
  }

  return (
    <Search />
  )
}

export default App
