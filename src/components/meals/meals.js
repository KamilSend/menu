import React, { Component } from 'react'

import styles from './meals.module.scss'

class Meals extends Component{

    render(){

        const meals = Object.values(this.props.meals.breakfasts).map(meal => {
            return(
                <span
                    key={meal.name}
                    className={styles.Meal}
                    onClick={() =>
                {
                    this.props.addMeal(
                        meal.ing1, meal.ing1Value,
                        meal.ing2, meal.ing2Value,
                        meal.ing3, meal.ing3Value,
                        meal.ing4, meal.ing4Value,
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