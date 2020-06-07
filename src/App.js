import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BudoReads from './BudoReads'

class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
        <BudoReads />
      </div>
    )
  }
}

export default BooksApp
