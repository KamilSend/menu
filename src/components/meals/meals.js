import React, { Component } from 'react'

import styles from './meals.module.scss'

class Meals extends Component{

    render(){

        // const meals = Object.values(this.props.meals.breakfasts).map(meal => {
        //     return(
        //         <span
        //             key={meal.name}
        //             className={styles.Meal}
        //             onClick={() =>
        //         {
        //             this.props.addMeal(
        //                 meal.ing1, meal.ing1Value,
        //                 meal.ing2, meal.ing2Value,
        //                 meal.ing3, meal.ing3Value,
        //                 meal.ing4, meal.ing4Value,
        //             )
        //         }
        //
        //         }>{meal.name}</span>
        //     )
        // })


        // console.log(this.props.meals2.breakfasts)
        // console.log(Object.values(this.props.meals2.breakfasts))

        const meals = Object.values(this.props.meals2.breakfasts).map(meal => {
            // console.log(meal.ingredients)
            const allIngredients = Object.keys(meal.ingredients)
                .map((key) => [(key), meal.ingredients[key]]);
            const flatIngredients = allIngredients.flat(2)
            // console.log(flatIngredients)

            return(
                <span
                    key={meal.name}
                    className={styles.Meal}
                    onClick={() =>
                    {
                        // this.props.addMeal(
                        //     meal.ing1, meal.ing1Value,
                        //     meal.ing2, meal.ing2Value,
                        //     meal.ing3, meal.ing3Value,
                        //     meal.ing4, meal.ing4Value,
                        // )
                        this.props.addMeal(
                            flatIngredients
                        )
                        // this.props.addMeal2(
                        //     allIngredients[0][0],allIngredients[0][1],
                        //     allIngredients[1][0],allIngredients[1][1],
                        //     allIngredients[2][0],allIngredients[2][1],
                        // )
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