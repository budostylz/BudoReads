
/**
  * TODO: Search Component
*/


import React from 'react'



const Search = (props) => {

    return (


        <div>
            {console.log('Search props,', props)}
            <div className="search-books">
                <div className="search-books-bar mt-5">
                    <div className="search-books-input-wrapper">

                        {/*
                                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                You can find these search terms here:
                                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                you don't find a specific author or title. Every search is limited by search terms.
                                */}

                    </div>
                </div>
                <div className="search-books-results mt-5">
                    <ol className="books-grid">
                        {/*console.log('Search props', props)*/}
                        {props.searchResults.map(book => (<li key={book.id}>
                            <div className="book" id={book.id}>
                                <div className="book-top">
                                    <div className="book-cover"
                                        style={{ width: 128, height: 188, backgroundImage: `url("${(book.imageLinks) ? book.imageLinks.thumbnail : ''}")` }}>
                                    </div>
                                    <div className="book-shelf-changer">
                                        <select
                                            defaultValue={
                                                (props.currentBooks.filter(currentBook => currentBook.id === book.id).length > 0)
                                                    ? props.currentBooks.filter(currentBook => currentBook.id === book.id)[0].shelf
                                                    : 'move'
                                            }
                                            onChange={props.selectBookShelf}
                                        >
                                            <option value="move">Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {/*(book.authors.length > 0) ? book.authors.toString() : 'No Author(s)'*/}
                                </div>
                            </div>
                        </li>))}
                    </ol>

                </div>
            </div>


        </div>
    )

}



export default Search


