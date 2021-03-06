/**
  * TODO: Nav Component
  * Pass props from parent and render component.
  * Ensure props are valid via prop types.
*/
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const Nav = (props) => {

    return (<nav className="navbar navbar-light bg-light">

        <Route
            exact path='/'
            render={() => (

                <Link
                    to='/search'
                    className="navbar-brand"
                    style={{ color: '#000000' }}
                ><em>Click Here to Search Books</em></Link>
            )}
        />

        <Route
            path='/search'
            render={() => (
                <Link
                    to='/'
                    className="navbar-brand"
                    style={{ color: '#000000' }}
                    onClick={props.clearSearchResults}
                ><em>Click Here to Return Home</em></Link>
            )}
        />



        <form className="form-inline">


            <Route
                path='/search'
                render={() => (
                    <input
                        className="form-control mr-sm-2 navSearchBox"
                        type="search"
                        placeholder="Search Books Here"
                        aria-label="Search"
                        onChange={props.searchBooks}
                    />
                )}
            />


        </form>


    </nav>)

}

Nav.propTypes = {
    searchBooks: PropTypes.func.isRequired,
    clearSearchResults: PropTypes.func.isRequired

}



export default Nav