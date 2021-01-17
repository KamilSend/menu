import React from 'react'

import Meals from '../meals/meals'
import Shoplist from "../../containers/Shoplist/Shoplist"
import AddMeal from '../meals/addMeal/addMeal'

import styles from './recipes.module.scss'

const recipes = (props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    return (
        <>
            <div className={styles.Recipes}>
                <div>
                    <h1>Przepisy</h1>
                    <Meals
                        addMeal={props.addMeal}
                        meals={props.meals}
                        firebase={props.firebase}
                    />
                    <Shoplist
                        allIngredients={allIngredients}
                    />
                </div>
                <AddMeal
                    addCustomRecipe = {props.addCustomRecipe}
                    productCounter = {props.productCounter}
                    sendCustomRecipe = {props.sendCustomRecipe}
                    switchAddingIngredientsMode = {props.switchAddingIngredientsMode}
                />
            </div>


        </>
        )

}

export default recipes;