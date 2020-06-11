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


        if (selectOption !== shelf) {

            const bookID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
            const book = myBooks.filter(book => book.id === bookID)[0];
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





    }

    removeBookFromCollection = () => {//get

    }


    searchBooks = () => {//search

    }






    render() {

        console.log('state', this.state)

        const { myBooks, selectOption } = this.state;
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
                    <Search />
                )}
            />



        </div>)
    }
}

export default BudoReads