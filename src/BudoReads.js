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

class BudoReads extends Component {

    state = {

    }


    render() {

        return (<div>

            <Route
                exact path='/'
                render={() => (
                    <div className="list-books">
                        <div className="list-books-content">
                            <div>
                                <CurrentReads />
                                <WantToReads />
                                <Reads />
                                <Nav />
                            </div>
                        </div>

                    </div>)}
            />

            <Route
                path='/search'
                render={() => (
                    <Search />
                )}
            />



        </div>)
    }
}

export default BudoReads