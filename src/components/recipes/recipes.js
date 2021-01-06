import React from 'react'

import Meals from '../meals/meals'
import Shoplist from "../../containers/Shoplist/Shoplist";

const recipes = (props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    return (
        <>
            <h1>Przepisy</h1>
            <Meals
                addMeal={props.addMeal}
                meals={props.meals}
            />
            <Shoplist
                allIngredients={allIngredients}
            />
        </>
        )

}

export default recipes