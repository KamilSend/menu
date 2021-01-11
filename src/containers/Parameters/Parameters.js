import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-meals'

import Products from '../../components/products/products'
import Summary from '../summary/summary'
import Recipes from "../../components/recipes/recipes";
import WholeDayMeals from "../WholeDayMealsTemp/WholeDayMeals";

class Layout extends Component{

    state = {
        ingredients: {
            feta: {id:1, name: "feta", amount: null, kcal: 1, price: 7}
            },
        addIngredient: {
            title: '',
            name: '',
            kcal: 0,
            id: 0,
            price: 0,
            amount: null,
        },
        meals:{
            breakfasts: {
            },
        },
        menus:{
            menu1: {
                breakfast: "meal1",
                branch: null,
                dinner: "meal1",
                supper: "meal1",
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

    // ----------------------SENDING PRODUCTS TO FIREBASE START------------------------------------------
    inputIngredientHandler(event, type) {
        const updatedIngredient = {
            ...this.state.addIngredient
        }
        updatedIngredient[type] = event.target.value
        this.setState({addIngredient: updatedIngredient})
    }

    handleIngredientSubmit = () => {
        axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/ingredients/${this.state.addIngredient.title}.json`,
            {
                id: Object.keys(this.state.ingredients).length + 1,
                name: this.state.addIngredient.name,
                amount: this.state.addIngredient.amount,
                kcal: this.state.addIngredient.kcal,
                price: this.state.addIngredient.price
            }
        )
            .then(response => console.log(response))

        this.setState({addIngredient: {
                title: '',
                name: '',
                kcal: 0,
                id: 0,
                price: '',
                amount: 0,
            },})

        const updatedIngredients = Object.entries({
            ...this.state.ingredients
        })

        const id = Object.keys(this.state.ingredients).length + 1

        const newID = id - 2

        updatedIngredients[newID][0] = this.state.addIngredient.title
        updatedIngredients[newID][1] = {
            amount: this.state.addIngredient.amount,
            id: id,
            kcal: this.state.addIngredient.kcal,
            name: this.state.addIngredient.name,
            price: this.state.addIngredient.price
        }

        const newStateObject = Object.fromEntries(updatedIngredients)

        this.setState({ingredients: newStateObject})
    }

    // ----------------------SENDING PRODUCTS TO FIREBASE END------------------------------------------

    componentDidMount() {

        //póki co prymitywne pobieranie całej bazy danych z firebase
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
                            inputAddProduct = {this.inputIngredientHandler.bind(this)}
                            submitProduct = {this.handleIngredientSubmit.bind(this)}
                            inputValues={this.state.addIngredient}
                        />
                    </Route>
                    <Route path="/przepisy">
                        <Recipes
                            addMeal = {this.addMealHandler.bind(this)}
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
                            menus = {this.state.menus}
                            addWholeDayMeals = {this.addWholeDayMealsHandler.bind(this)}
                        />
                    </Route>

                </Switch>

            </>
        )
    }
}

export default Layout;