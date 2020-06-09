/**
  * TODO: BudoReads Component
*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CurrentReads from './CurrentReads.js'
import WantToReads from './WantToReads.js'
import Reads from './Reads.js'
import Nav from './Nav.js'
import Search from './Search.js'
import * as BooksAPI from './BooksAPI'


class BudoReads extends Component {

    state = {

        currentReads: [],
        wantToReads: [],
        read: [],
        searchResults: [],
        selectOption: null


    }

    componentDidMount() {//getAll

        console.log('componentDidMount')
        BooksAPI.getAll()
            .then((books) => {
                console.log('books', books)

                this.filterBooks(books);

            })
    }

    filterBooks = (books) => {
        const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading');
        const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead');
        const readBooks = books.filter(book => book.shelf === 'read');

        this.setState(currentState => ({
            currentReads: currentlyReadingBooks,
            wantToReads: wantToReadBooks,
            read: readBooks


        }))

    }


    updateBookShelf = () => {//update

    }

    removeBookFromCollection = () => {//get

    }


    searchBooks = () => {//search

    }






    render() {

        console.log('state', this.state)
        return (<div>

            <Route
                exact path='/'
                render={() => (
                    <div className="list-books">
                        <div className="list-books-content">
                            <div>
                                <CurrentReads
                                    currentBooks={this.state.currentReads}
                                />
                                <WantToReads
                                    wantToReadBooks={this.state.wantToReads} />
                                <Reads
                                    readBooks={this.state.read} />
                                <Nav />
                            </div>
                        </div>

                    </div>)}
            />

            <Route
                path='/search'
                render={({ history }) => (
                    <Search />
                )}
            />



        </div>)
    }
}

export default BudoReads