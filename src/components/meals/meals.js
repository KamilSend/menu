import React, { Component } from 'react'

import Meal from './meal/meal'

class Meals extends Component{

    state = {
        breakfasts: {
            meal1:
                {
                    ing1: "eggs",
                    ing1Value: 3,
                    ing2: "bread",
                    ing2Value: 2,
                    ing3: "butter",
                    ing3Value: 1,
                    name: "jajecznica",
                },
            meal2:
                {
                    ing1: "eggs",
                    ing1Value: 2,
                    ing2: "bread",
                    ing2Value: 3,
                    ing3: "butter",
                    ing3Value: 1,
                    name: "kanapki z jajkiem"
                },
            meal3:
                {
                    ing1: "feta",
                    ing1Value: 1,
                    ing2: "mozzarella",
                    ing2Value: 1,
                    name:"feta z mozzarellą"
                },
            meal4:
                {
                    ing1: "feta",
                    ing1Value: 1,
                    ing2: "mozzarella",
                    ing2Value: 1,
                    ing3: "bread",
                    ing3Value: 1,
                    ing4: "butter",
                    ing4Value: 1,
                    name:"feta z mozzarellą z chlebem i masłem"
                },
        }
    }

    render(){

        const meals = Object.values(this.state.breakfasts).map(meal => {
            return(
                <span key={meal.name} onClick={() =>
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
                <div>
                    {meals}
                </div>

                {/*<span onClick={() =>*/}
                {/*{*/}
                {/*    // console.log(this.state.breakfasts.meal3)*/}
                {/*    this.props.addMeal(*/}
                {/*        this.state.breakfasts.meal3.ing1,*/}
                {/*        this.state.breakfasts.meal3.ing1Value,*/}
                {/*        this.state.breakfasts.meal3.ing2,*/}
                {/*        this.state.breakfasts.meal3.ing2Value,*/}
                {/*        this.state.breakfasts.meal3.ing3,*/}
                {/*        this.state.breakfasts.meal3.ing3Value,*/}
                {/*    )*/}
                {/*}*/}

                {/*}>Próba dodania jajecznicy bez masła</span>*/}
                {/*<Meal*/}
                {/*    addMeal={this.props.addMeal}*/}
                {/*    ing1 ={this.state.breakfasts.meal1.ing1}*/}
                {/*    ing1Value = {this.state.breakfasts.meal1.ing1Value}*/}
                {/*    ing2 = {this.state.breakfasts.meal1.ing2}*/}
                {/*    ing2Value = {this.state.breakfasts.meal1.ing2Value}*/}
                {/*    ing3 = {this.state.breakfasts.meal1.ing3}*/}
                {/*    ing3Value = {this.state.breakfasts.meal1.ing3Value}*/}
                {/*    name={this.state.breakfasts.meal1.name}*/}
                {/*/>*/}
                {/*<Meal*/}
                {/*    addMeal={this.props.addMeal}*/}
                {/*    ing1 ={this.state.breakfasts.meal2.ing1}*/}
                {/*    ing1Value = {this.state.breakfasts.meal2.ing1Value}*/}
                {/*    ing2 = {this.state.breakfasts.meal2.ing2}*/}
                {/*    ing2Value = {this.state.breakfasts.meal2.ing2Value}*/}
                {/*    ing3 = {this.state.breakfasts.meal2.ing3}*/}
                {/*    ing3Value = {this.state.breakfasts.meal2.ing3Value}*/}
                {/*    name={this.state.breakfasts.meal2.name}*/}
                {/*/>*/}

            </>
        )
    }
}

export default Meals