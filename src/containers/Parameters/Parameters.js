import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-meals'

import Products from '../../components/products/products'
import Summary from '../summary/summary'
import Recipes from "../../components/recipes/recipes";
import WholeDayMeals from "../WholeDayMealsTemp/WholeDayMeals";

class Layout extends Component{

    state = {
        // ingredients: {
        //     feta: {id:1, name: "feta", amount: null, kcal: 1, price: 7},
        //     eggs: {id:2, name: "jajka", amount: null, kcal: 2, price: 6},
        //     butter: {id:3, name: "masło", amount : null, kcal: 3, price: 5},
        //     milk_skim: {id:4, name: "mleko 1,5%", amount: null, kcal: 4, price: 4},
        //     milk_regular: {id:5, name: "mleko 3,2%", amount: null, kcal: 5, price: 3},
        //     mozzarella: {id:6, name: "mozarella", amount : null, kcal: 6, price: 2},
        //     bread: {id:7, name: "chleb", amount: null, kcal: 7, price: 1}
        // },
        ingredients: {
            feta: {id:1, name: "feta", amount: null, kcal: 1, price: 7}
        },
        meals:{
            breakfasts: {
                // meal1:
                //     {
                //         ing1: "eggs",
                //         ing1Value: 3,
                //         ing2: "bread",
                //         ing2Value: 2,
                //         ing3: "butter",
                //         ing3Value: 1,
                //         name: "jajecznica",
                //     },
                // meal2:
                //     {
                //         ing1: "eggs",
                //         ing1Value: 2,
                //         ing2: "bread",
                //         ing2Value: 3,
                //         ing3: "butter",
                //         ing3Value: 1,
                //         name: "kanapki z jajkiem"
                //     },
                // meal3:
                //     {
                //         ing1: "feta",
                //         ing1Value: 1,
                //         ing2: "mozzarella",
                //         ing2Value: 1,
                //         name:"feta z mozzarellą"
                //     },
                // meal4:
                //     {
                //         ing1: "feta",
                //         ing1Value: 1,
                //         ing2: "mozzarella",
                //         ing2Value: 1,
                //         ing3: "bread",
                //         ing3Value: 1,
                //         ing4: "butter",
                //         ing4Value: 1,
                //         name:"feta z mozzarellą z chlebem i masłem"
                //     },
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

    addMealHandler () {

        //Make an array of unknown number of function arguments
        const args = Array.prototype.slice.call(arguments);

        console.log('args: '+args)

        //initialize arrays of ingredients, their values and their current values
        const ingredients = []
        const values = []
        const oldCounts = []

        //make copy from current state
        const updatedIngredients = {
            ...this.state.ingredients
        }

        //divide function arguments into ingredients and their values, make array of current values
        args.forEach((arg, index) => {
            if (index % 2 === 0 && arg !== null && arg !== undefined){
                ingredients.push(arg)
                oldCounts.push(this.state.ingredients[arg].amount)
            }else if(arg !== null && arg !== undefined){
                values.push(arg)
            }
        })

        ingredients.forEach((ing, index) => {
            updatedIngredients[ing].amount = oldCounts[index] + values[index]
        })

        this.setState({ingredients: updatedIngredients})

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
                this.state.meals.breakfasts[arg].ing3Value,
                this.state.meals.breakfasts[arg].ing4,
                this.state.meals.breakfasts[arg].ing4Value
            )
        })

    }

    firebase = () => {
        // //wysyłanie stanu do firebase
        // const ingredients = this.state.ingredients
        //
        // axios.post('/ingredients.json', ingredients)
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error))
    }

    componentDidMount() {
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
                }
            )
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/meals.json')
            .then(response => {
                    this.setState({meals: response.data})
                }
            )
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
                            firebase = {this.firebase}
                            ingredientsList = {this.state.ingredients}
                            meals={this.state.meals}
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