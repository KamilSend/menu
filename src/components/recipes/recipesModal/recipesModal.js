import React from 'react'
import { NavLink } from 'react-router-dom';

import DisplayProducts from '../../products/displayProducts/displayProducts'
import Shoplist from "../../../containers/Shoplist/Shoplist";

import styles from './recipesModal.module.scss'

const recipesModal = (props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    return(
        // TODO zrobić szkło z jakimś napisem typu 'jesteś w trybie dodawania produktu, wybierz składniki i wyślij'
        <div className={styles.RecipesModal}>
            <h1>Dodaj produkty do przepisu</h1>
            <NavLink
                to="/przepisy"
                onClick = {props.switchAddingIngredientsMode}
            >
                zamknij w cholere
            </NavLink>
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