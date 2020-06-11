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

        myBooks: [],
        searchResults: [],
        selectOption: ''


    }

    componentDidMount() {//getAll

        //console.log('componentDidMount')
        BooksAPI.getAll()
            .then((books) => {
                //console.log('books', books)

                this.getBooks(books);

            })
    }



    getBooks = (books) => {

        this.setState(currentState => ({
            myBooks: books

        }))

    }


    updateBookShelf = (e) => {//update

        const { myBooks, selectOption } = this.state;
        const shelf = e.target.options[e.target.options.selectedIndex].value;

        console.log('selectedOption', selectOption)
        console.log('shelf', shelf)


        const bookID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
        const book = myBooks.filter(book => book.id === bookID)[0]; //shoe me a better way to not use an index[0] if possible
        const newBookSet = myBooks.filter(book => book.id !== bookID);

        //console.log('state', this.state)
        //console.log('shelf', shelf)
        //console.log('book id', bookID)
        //console.log('selectedBook', book)
        //console.log('new book set filtered', newBookSet)



        //update API
        BooksAPI.update(book, shelf)
            .then((book) => {
                //console.log('update book', book)
                BooksAPI.get(bookID)
                    .then((book) => {
                        //console.log('get updated book', book)

                        newBookSet.push(book)

                        //console.log('new myBooks state', newBookSet)

                        this.setState(currentState => ({
                            myBooks: newBookSet,
                            selectOption: shelf

                        }))
                    })

            })


    }


    searchBooks = (e) => {//search

        const query = e.target.value;

        if (query.trim().length > 0) {

            BooksAPI.search(query)
                .then((result) => {

                    if (result) {
                        if (result.error) {
                            //console.log('error', result)
                            this.setState(currentState => ({
                                searchResults: []
                            }))

                        } else {
                            //console.log('get results', result)
                            this.setState(currentState => ({
                                searchResults: result
                            }))
                        }

                    } else {
                        //console.log('undef', result)
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

    addBookToShelf = (e) => {

        const shelf = e.target.options[e.target.options.selectedIndex].value;


        if (shelf !== 'move') {

            const { myBooks, selectOption } = this.state;
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






    render() {

        console.log('state', this.state)

        const { myBooks, selectOption, searchResults } = this.state;
        return (<div>

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

                                <Nav />
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

                    />
                )}
            />



        </div>)
    }
}

export default BudoReads