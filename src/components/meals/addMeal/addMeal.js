import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from './addMeal.module.scss'

const addMeal = (props) => {

    // console.log(props.productCounter)

    // const inputs = props.productCounter.map((product, index) => {
    //     return(
    //         <input
    //             key={index}
    //             type="text"
    //             placeholder="Podaj nazwę produktu"
    //             onChange={(event) => props.addCustomRecipe(event)}
    //         />
    //     )
    // })

    return(
        <div className={styles.AddMeal}>
            <h3>Dodaj własny przepis</h3>

            <NavLink
                to="/przepisy/dodaj"
                onClick = {props.switchAddingIngredientsMode}
            >
                Dodaj składniki
            </NavLink>

            <button onClick={props.sendCustomRecipe}>Wyślij przepis</button>



        </div>
    )
}

export default addMeal