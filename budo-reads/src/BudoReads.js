/**
  * TODO: BudoReads Component: Parent component that houses state and sends props to child components.
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


    /**
      * TODO: 3 pieces of state:
      * myBooks: Collection of books that are pulled from API and updated by user via user interface.
      * searchResults: Collection of books that are pulled from search API.
      * selectOption: Tracks user shelf selection.
    */

    state = {

        myBooks: [],
        searchResults: [],
        selectOption: ''


    }


    /**
      * TODO: componentDidMount()
      * Pulls books from API results using getAll() after DOM is rendered in lifecycle.
      * Sets myBooks[] within state
      * 
    */

    componentDidMount() {//getAll
        BooksAPI.getAll()
            .then((books) => {
                this.setState(currentState => ({
                    myBooks: books
                }))
            })
    }

    /**
         * TODO: updateBookShelf()
         * Updates book shelf base on user selection.
         * Retrieves user selection 'currently reading', 'want to read' and 'read'.
         * Updates API base on user selection.
         * Updates myBooks and selectOption within state base on user selection.
       */

    updateBookShelf = (e) => {//update
        const { myBooks } = this.state;
        const shelf = e.target.options[e.target.options.selectedIndex].value;
        const bookID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
        const book = myBooks.filter(book => book.id === bookID)[0]; //show me a better way to not use an index[0] if possible
        const newBookSet = myBooks.filter(book => book.id !== bookID);

        //update API
        BooksAPI.update(book, shelf)
            .then((book) => {
                BooksAPI.get(bookID)
                    .then((book) => {
                        newBookSet.push(book)
                        this.setState(currentState => ({
                            myBooks: newBookSet,
                            selectOption: shelf

                        }))
                    })
            })


    }

    /**
        * TODO: searchBooks()
        * Search books by pulling from search API base on user query.
        * Handles search errors.
        * Update state if proper search result is pulled.
      */


    searchBooks = (e) => {//search
        const query = e.target.value;
        if (query.trim().length > 0) {
            BooksAPI.search(query)
                .then((result) => {
                    if (result) {
                        if (result.error) {
                            this.setState(currentState => ({
                                searchResults: []
                            }))
                        } else {
                            this.setState(currentState => ({
                                searchResults: result
                            }))
                        }
                    } else {
                        this.setState(currentState => ({
                            searchResults: []
                        }))

                    }
                })

        } else {
            this.setState(currentState => ({
                searchResults: []

            }))
        }



    }

    /**
       * TODO: addBookToShelf()
       * Add books to shelf from search page
       * Retrieves book from API
       * Updates book shelf in API
       * Updates book shelf in state
       * 
     */
    addBookToShelf = (e) => {
        const shelf = e.target.options[e.target.options.selectedIndex].value;
        if (shelf !== 'move') {

            const { myBooks } = this.state;
            const bookID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
            const newBookSet = myBooks.filter(book => book.id !== bookID);

            //console.log(shelf, bookID, newBookSet)

            BooksAPI.get(bookID)
                .then((book) => {
                    BooksAPI.update(book, shelf)
                        .then((updatedBook) => {

                            BooksAPI.get(bookID)
                                .then((updatedBook) => {
                                    //console.log('updated book', updatedBook)

                                    newBookSet.push(updatedBook)

                                    this.setState(currentState => ({
                                        myBooks: newBookSet,
                                        selectOption: shelf

                                    }))

                                })
                        })
                })

        }
    }


    /**
       * TODO: clearSearchResults()
       * Clear search results when user navigates back to home page.
       * 
     */

    clearSearchResults = () => {
        this.setState(currentState => ({
            searchResults: []
        }))
    }

    /**
       * TODO: render()
       * Pass props to child components. 
       * Render child components.
       * 
     */

    render() {
        const { myBooks, selectOption, searchResults } = this.state;
        return (<div>
            <Nav
                searchBooks={this.searchBooks}
                clearSearchResults={this.clearSearchResults}

            />
            <Route
                exact path='/'
                render={() => (
                    <div className="list-books">
                        <div className="list-books-content">
                            <div>

                                <CurrentReads
                                    currentBooks={myBooks}
                                    selectOption={selectOption}
                                    selectBookShelf={this.updateBookShelf}
                                />
                                <WantToReads
                                    wantToReadBooks={myBooks}
                                    selectOption={selectOption}
                                    selectBookShelf={this.updateBookShelf}
                                />
                                <Reads
                                    readBooks={myBooks}
                                    selectOption={selectOption}
                                    selectBookShelf={this.updateBookShelf}
                                />


                            </div>
                        </div>

                    </div>)}
            />

            <Route
                path='/search'
                render={({ history }) => (
                    <Search
                        searchBooks={this.searchBooks}
                        searchResults={searchResults}
                        selectOption={selectOption}
                        selectBookShelf={this.addBookToShelf}
                        currentBooks={myBooks}


                    />
                )}
            />


        </div>)
    }
}

export default BudoReads
