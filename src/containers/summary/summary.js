import React from 'react'

import Shoplist from "../Shoplist/Shoplist";

import styles from "./summary.module.css"

const summary = (props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    const calories = allIngredients.map((ingredient) => {
        if(ingredient[1].amount > 0) {return (
            <p key={ingredient[1].id}>
                <span>{ingredient[1].kcal} kcal</span>
                <span>{ingredient[1].price} zł</span>
            </p>
        )} else return null;
    })

    return(
        <>
            <h1>Podsumowanie:</h1>
            <div className={styles.Summary}>
                <Shoplist
                    allIngredients = {allIngredients}
                />
                <div className={styles.Calories}>
                    {calories}
                </div>

            </div>
        </>
        )
}

export default summary


        // const calories = Object.values(this.state.ingredients).map((ingredient, index) => {
        //
        //     if(ingredient * Object.values(this.props.ingredientsList)[index] !== 0)
        //     return <p>{ingredient * Object.values(this.props.ingredientsList)[index]}</p>
        // })
