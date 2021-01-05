import React, { Component } from 'react'

import Parameters from "../Parameters/Parameters";
import MainNavigation from '../../components/mainNavigation/mainNavigation'

class Layout extends Component{
    render(){
        return(
            <>
                <header>
                    <MainNavigation/>
                </header>
                <main>
                    <Parameters/>
                </main>


            </>
        )
    }
}

export default Layout;