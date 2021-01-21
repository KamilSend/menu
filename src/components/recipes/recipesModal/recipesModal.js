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
            <div>
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
            </div>
            <div>

                <input
                    onChange={(event) => props.addMealInputs(event, 'title')}
                    type="text"
                    placeholder="Podaj tytuł produktu"
                    // value={props.inputValues.name}
                />
                <input
                    onChange={(event) => props.addMealInputs(event, 'name')}
                    type="text"
                    placeholder="Podaj dokładną nazwę produktu"
                    // value={props.inputValues.name}
                />
                <Shoplist
                    allIngredients={allIngredients}
                />
                <button onClick={props.sendCustomRecipe} type="submit">Wyślij przepis</button>


            </div>

        </div>
    )
}

export default recipesModal