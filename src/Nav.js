/**
  * TODO: Nav Component
*/
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'



const Nav = (props) => {

    //console.log('Nav props', props)

    return (<div className="container">
        <div className="row">
            <div className="col text-center">

                <Route
                    exact path='/'
                    render={() => (
                        <div>
                            <Link
                                to='/search'
                                className="navbar-brand"
                                style={{ color: '#000000' }}
                            >Click Here to Search Books</Link>
                        </div>)}
                />

                <Route
                    path='/search'
                    render={() => (
                        <div>
                            <Link
                                to='/'
                                className="navbar-brand"
                                style={{ color: '#000000' }}
                            >Click Here to Return Home</Link>
                        </div>)}
                />

            </div>
        </div>
    </div>)

}



export default Nav