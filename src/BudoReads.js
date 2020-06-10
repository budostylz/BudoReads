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

        const { myBooks } = this.state;
        const selectValue = e.target.options[e.target.options.selectedIndex].value;
        const bookID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
        const selectedBook = myBooks.filter(book => book.id === bookID);



        console.log('selected shelf', selectValue)
        console.log('book id', bookID)
        console.log('selectedBook', selectedBook)




        //update state
        this.setState(currentState => ({
            selectOption: selectValue

        }))

        //update API

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