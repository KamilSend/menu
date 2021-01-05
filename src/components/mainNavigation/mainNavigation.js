import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from './mainNavigation.module.css'

const mainNavigation = () => (

    <nav>
        <ul  className={styles.MainNavigation}>
            <NavLink to="/jadlospisy">Jadłospisy</NavLink>
            <NavLink to="/przepisy">Przepisy</NavLink>
            <NavLink to="/produkty">Produkty</NavLink>
            <NavLink to="/podsumowanie">Podsumowanie</NavLink>
        </ul>
    </nav>

)

export default mainNavigation