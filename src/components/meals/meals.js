import React, { Component } from 'react'

import styles from './meals.module.scss'

class Meals extends Component{

    render(){

        const meals = Object.values(this.props.meals2.breakfasts).map(meal => {
            const allIngredients = Object.keys(meal.ingredients)
                .map((key) => [(key), meal.ingredients[key]]);
            const flatIngredients = allIngredients.flat(2)

            return(
                <span
                    key={meal.name}
                    className={styles.Meal}
                    onClick={() =>
                    {
                        this.props.addMeal(
                            flatIngredients
                        )
                    }

                    }>{meal.name}</span>
            )
        })

        return(
            <>
                <div className={styles.Meals}>
                    {meals}
                </div>
            </>
        )
    }
}

export default Meals