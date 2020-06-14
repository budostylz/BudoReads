/**
  * TODO: CurrentReads Component
*/


import React from 'react'
import PropTypes from 'prop-types'

const CurrentReads = (props) => (<div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {/*console.log('CurrentReads props', props.currentBooks.filter(book => book.shelf === 'currentlyReading'))*/}
            {props.currentBooks.filter(book => book.shelf === 'currentlyReading').map(book => (<li key={book.id}>
                <div className="book" id={book.id}>
                    <div className="book-top">
                        <div className="book-cover"
                            style={{ width: 128, height: 188, backgroundImage: `url("${(book.imageLinks) ? book.imageLinks.thumbnail : ''}")` }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                defaultValue='currentlyReading'
                                onChange={props.selectBookShelf}

                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {(book.authors && book.authors.length > 0) ? book.authors.toString() : 'No Author(s)'}
                    </div>
                </div>
            </li>))}


        </ol>
    </div>
</div>)




CurrentReads.propTypes = {
    currentBooks: PropTypes.array.isRequired,
    selectOption: PropTypes.string.isRequired,
    selectBookShelf: PropTypes.func.isRequired

}



export default CurrentReads