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
                    ing2Value: 1,
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
        }
    }

    render(){

        return(
            <>
                <Meal
                    addMeal={this.props.addMeal}
                    ing1 ={this.state.breakfasts.meal1.ing1}
                    ing1Value = {this.state.breakfasts.meal1.ing1Value}
                    ing2 = {this.state.breakfasts.meal1.ing2}
                    ing2Value = {this.state.breakfasts.meal1.ing2Value}
                    ing3 = {this.state.breakfasts.meal1.ing3}
                    ing3Value = {this.state.breakfasts.meal1.ing3Value}
                    name={this.state.breakfasts.meal1.name}
                />
                <Meal
                    addMeal={this.props.addMeal}
                    ing1 ={this.state.breakfasts.meal2.ing1}
                    ing1Value = {this.state.breakfasts.meal2.ing1Value}
                    ing2 = {this.state.breakfasts.meal2.ing2}
                    ing2Value = {this.state.breakfasts.meal2.ing2Value}
                    ing3 = {this.state.breakfasts.meal2.ing3}
                    ing3Value = {this.state.breakfasts.meal2.ing3Value}
                    name={this.state.breakfasts.meal2.name}
                />
            </>
        )
    }
}

export default Meals