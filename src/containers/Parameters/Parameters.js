import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import Products from '../../components/products/products'
import Summary from '../summary/summary'
import Recipes from "../../components/recipes/recipes";
import WholeDayMeals from "../WholeDayMealsTemp/WholeDayMeals";

class Layout extends Component{


    state = {
        ingredients: {
            feta: {id:1, name: "feta", amount: null, kcal: 1, price: 7},
            eggs: {id:2, name: "jajka", amount: null, kcal: 2, price: 6},
            butter: {id:3, name: "masło", amount : null, kcal: 3, price: 5},
            milk_skim: {id:4, name: "mleko 1,5%", amount: null, kcal: 4, price: 4},
            milk_regular: {id:5, name: "mleko 3,2%", amount: null, kcal: 5, price: 3},
            mozzarella: {id:6, name: "mozarella", amount : null, kcal: 6, price: 2},
            bread: {id:7, name: "chleb", amount: null, kcal: 7, price: 1}
        },
        meals:{
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
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type].amount;
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type].amount = updatedCount;

        this.setState({ingredients: updatedIngredients})
    }

    // addMealHandler = (ing1, ing1Value, ing2, ing2Value, ing3, ing3Value) => {
    //
    //     const oldCount1 = this.state.ingredients[ing1].amount
    //     const oldCount2 = this.state.ingredients[ing2].amount
    //     const oldCount3 = this.state.ingredients[ing3].amount
    //
    //     const updatedCount1 = oldCount1 + ing1Value
    //     const updatedCount2 = oldCount2 + ing2Value
    //     const updatedCount3 = oldCount3 + ing3Value
    //
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //
    //     if(updatedCount1){
    //         updatedIngredients[ing1].amount = updatedCount1
    //     }
    //     if(updatedCount2){
    //         updatedIngredients[ing2].amount = updatedCount2
    //     }
    //     if(updatedCount3){
    //         updatedIngredients[ing3].amount = updatedCount3
    //     }
    //
    //     this.setState({ingredients: updatedIngredients})
    // };

    addMealHandler () {

        const args = Array.prototype.slice.call(arguments);

        //TODO - podzielić tablice args na dwie: tablice produktów i wartości i dopiero wtedy iterować po nich

        args.forEach((arg, index) => {

            let oldCount
            let value

            if (index % 2 === 0){
                // console.log(arg)
                oldCount = this.state.ingredients[arg].amount
                console.log("oldCount: "+oldCount)
            }
            else{
                value = arg
                const updatedCount = oldCount + value
                console.log(updatedCount)
            }


            // const oldCount = this.state.ingredients[arg].amount
            // const oldCount = this.state.ingredients.eggs.amount
        })

        // const oldCount1 = this.state.ingredients[ing1].amount
        // const oldCount2 = this.state.ingredients[ing2].amount
        // const oldCount3 = this.state.ingredients[ing3].amount
        //
        // const updatedCount1 = oldCount1 + ing1Value
        // const updatedCount2 = oldCount2 + ing2Value
        // const updatedCount3 = oldCount3 + ing3Value
        //
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // }
        //
        // if(updatedCount1){
        //     updatedIngredients[ing1].amount = updatedCount1
        // }
        // if(updatedCount2){
        //     updatedIngredients[ing2].amount = updatedCount2
        // }
        // if(updatedCount3){
        //     updatedIngredients[ing3].amount = updatedCount3
        // }
        //
        // this.setState({ingredients: updatedIngredients})
    };

    addWholeDayMealsHandler () {
        //Make an array of unknown number of function arguments, arguments are set in WholeDayMeals
        const args = Array.prototype.slice.call(arguments);

        //loop through all arguments (meals)
        args.forEach((arg) => {
            this.addMealHandler(
                this.state.meals.breakfasts[arg].ing1,
                this.state.meals.breakfasts[arg].ing1Value,
                this.state.meals.breakfasts[arg].ing2,
                this.state.meals.breakfasts[arg].ing2Value,
                this.state.meals.breakfasts[arg].ing3,
                this.state.meals.breakfasts[arg].ing3Value
            )
        })

    }

    render(){

        return(
            <>

                <Switch>
                    <Route path="/produkty">
                        <Products
                            addIngredient={this.addIngredientHandler}
                            ingredientsList = {this.state.ingredients}
                        />
                    </Route>
                    <Route path="/przepisy">
                        <Recipes
                            addMeal = {this.addMealHandler.bind(this)}
                            ingredientsList = {this.state.ingredients}
                        />
                    </Route>
                    <Route path="/podsumowanie">
                        <Summary
                            ingredientsList = {this.state.ingredients}
                        />
                    </Route>
                    <Route path="/jadlospisy">
                        <WholeDayMeals
                            ingredientsList = {this.state.ingredients}
                            addWholeDayMeals = {this.addWholeDayMealsHandler.bind(this)}
                        />
                    </Route>

                </Switch>

            </>
        )
    }
}

export default Layout;