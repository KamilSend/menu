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
        ingredientsID:{
            id: 0,
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

        //form validation
        if(this.state.addIngredient.title === ''){
            alert('podaj tytuł produktu')
            return
        }

        if(this.state.addIngredient.name === ''){
            alert('podaj nazwę produktu')
            return
        }

        if(this.state.addIngredient.kcal === 0 || this.state.addIngredient.kcal === ''){
            alert('podaj kaloryczność produktu')
            return
        }

        if(this.state.addIngredient.price === 0 || this.state.addIngredient.price === ''){
            alert('podaj cenę produktu')
            return
        }

        //use axios to send ingredient object
        axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/ingredients/${this.state.addIngredient.title}.json`,
            {
                id: this.state.ingredientsID.id + 1,
                name: this.state.addIngredient.name,
                amount: this.state.addIngredient.amount,
                kcal: this.state.addIngredient.kcal,
                price: this.state.addIngredient.price
            }
        )
            .then(response => console.log(response))

        //use axios to send current id, each new ingredient will receive unique id
        axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/ingredientsID.json`,
            {
                id: this.state.ingredientsID.id + 1
            }
        )
            .then(response => console.log(response))

        //clear state (clear inputs) after sending ingredient
        this.setState({addIngredient: {
                title: '',
                name: '',
                kcal: 0,
                id: 0,
                price: 0,
                amount: 0,
            },})

        //make object from array which is copy of the state
        const updatedIngredients = Object.entries({
            ...this.state.ingredients
        })

        //make an array from new ingredient object
        const newIngredient = [this.state.addIngredient.title, {
            amount: this.state.addIngredient.amount,
            id: this.state.ingredientsID.id + 1,
            kcal: this.state.addIngredient.kcal,
            name: this.state.addIngredient.name,
            price: this.state.addIngredient.price}]

        //add new ingredient to ingredients array
        updatedIngredients.push(newIngredient)

        //make object from ingredients array
        const newStateObject = Object.fromEntries(updatedIngredients)

        //set new state for ingredients and id
        this.setState({ingredients: newStateObject})
        this.setState({ingredientsID: {id: this.state.ingredientsID.id + 1}})
    }

    // ----------------------SENDING PRODUCTS TO FIREBASE END------------------------------------------

    componentDidMount() {

        //póki co prymitywne pobieranie całej bazy danych z firebase
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
                }
            )
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredientsID.json')
            .then(response => {
                    this.setState({ingredientsID: response.data})
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