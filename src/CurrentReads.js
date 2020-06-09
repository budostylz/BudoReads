/**
  * TODO: CurrentReads Component
*/


import React from 'react'
import Select from 'react-select'

const CurrentReads = (props) => (<div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {console.log('CurrentReads props', props)}
            {props.currentBooks.map(book => (<li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read" defaultValue={'selected'}>Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {(book.authors.length > 0) ? book.authors.toString() : 'No Author(s)'}
                    </div>
                </div>
            </li>))}

        </ol>
    </div>
</div>)










export default CurrentReads