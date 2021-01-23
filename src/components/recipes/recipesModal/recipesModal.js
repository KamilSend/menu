import React from 'react'

import DisplayProducts from '../../products/displayProducts/displayProducts'
import Shoplist from "../../../containers/Shoplist/Shoplist";

import styles from './recipesModal.module.scss'

const recipesModal = (props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    return(
        <div className={styles.RecipesModal}>
            <h1>Dodaj produkty do przepisu</h1>
            <DisplayProducts
                allIngredients={allIngredients}
                addIngredient = {props.addIngredient}
            />
            <Shoplist
                allIngredients={allIngredients}
            />
        </div>
    )
}

export default recipesModal