import React from 'react'


const Reads = (props) =>
    (<div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {/*console.log('Reads props', props)*/}
                {props.readBooks.filter(book => book.shelf === 'read').map(book => (<li key={book.id}>
                    <div className="book" id={book.id}>
                        <div className="book-top">
                            <div className="book-cover"
                                style={{ width: 128, height: 188, backgroundImage: `url("${(book.imageLinks) ? book.imageLinks.thumbnail : ''}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select
                                    defaultValue='read'
                                    onChange={props.selectBookShelf}
                                >
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
                            {(book.authors && book.authors.length > 0) ? book.authors.toString() : 'No Author(s)'}
                        </div>
                    </div>
                </li>))}

            </ol>
        </div>
    </div>)


export default Reads