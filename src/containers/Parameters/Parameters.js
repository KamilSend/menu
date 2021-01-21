import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-meals'

import Products from '../../components/products/products'
import Summary from '../summary/summary'
import Recipes from "../../components/recipes/recipes";
import WholeDayMeals from "../WholeDayMealsTemp/WholeDayMeals";
import RecipesModal from "../../components/recipes/recipesModal/recipesModal"

class Layout extends Component{

    state = {
        ingredients: {
            feta: {id:1, name: "feta", amount: 0, kcal: 1, price: 7}
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
            amount: 0,
        },
        meals:{
            breakfasts: {
            },
            //zmienić całą strukture, żeby było  po prostu jajko: 2, chleb: 2,
        },
        meals2: {
            breakfasts: {
                scrambledEggs: {id:1, title:"scrambledEggs", name: "jajecznica", ingredients: {eggs: 3, butter: 1, bread: 1}},
                hamTomatoesSandwich: {id:2, title:"hamTomatoesSandwich", name: "kanapka z szynką i pomidorem", ingredients: {ham: 1, tomatoes:1, butter: 1, bread: 1}},
            }
        },
        mealsID:{
            id: 0,
        },
        addMeal: {
            breakfasts: {
                title:'',
                id: 0,
                name:'',
                ingredients: {}
            }
        },
        ingredientsAddedToMeal: {
            // feta: {id:1, name: "feta", amount: null, kcal: 1, price: 7}
        },
        addMealMode: false,
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
        if(this.state.addMealMode === true){
            //to będzie potrzebne chyba przy ostatecznym dodawaniu przepisu do właściwego stanu
            // const currentMeals = Object.keys(this.state.meals.breakfasts)
            //     .map((key) => [(key), this.state.meals.breakfasts[key]]);

            //make copy of current ingredients object (all ingredients available)
            const updatedIngredients2 = JSON.parse(JSON.stringify({
                ...this.state.ingredientsAddedToMeal
            }));

            //check which ingredients is added, and add plus one to its amount and set a new state
            const oldCount = this.state.ingredientsAddedToMeal[type].amount;
            updatedIngredients2[type].amount = oldCount + 1;
            this.setState({ingredientsAddedToMeal: updatedIngredients2})

            //make array from updatedIngredients object
            const allIngredients = Object.keys(updatedIngredients2)
                .map((key) => [(key), updatedIngredients2[key]]);

            //initialize empty array, to put in ingredients with non-zero amount
            const table = []

            //filter ingredients to catch only with non-zero amount
           allIngredients.forEach((ingredient) => {
                if (ingredient[1].amount) {
                    const ing = [ingredient[0], ingredient[1].amount]
                    table.push(ing)
                    const nonZeroIngredients = Object.fromEntries(table)

            //make copy from current state and update it
                    const updatedRecipe = {
                        ...this.state.addMeal
                    }
                    updatedRecipe.breakfasts.ingredients = nonZeroIngredients;
                    this.setState({addMeal: updatedRecipe})

                    // console.log(this.state.addMeal)
                } else return null;
            })

            // TODO: zrobić funkcje do obu inputów (może być jedna z parametrem) która będzie ustawiała name i title,
            //     później zrobić funkcje do sumbitu która będzie na buttonie, funkcja ta będzie musiała
            // pobrać id z firebase (zrobić obiekt w state i obiekt w firebase analogicznie jak dla produktów),
            // ustawić ostateczny stan i wysłać(dodać za pomocą put) do istniejącej bazy i do obecnego stanu przepisów
            return
        }

        //simple adding ingredients to state when you are in default mode
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
        const args = Array.prototype.slice.call(arguments)[0];

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

        //TODO - przerobić całe dodawanie jadłospisów, tak jak dodawanie przepisów

        //loop through all arguments (meals)
        args.forEach((arg) => {
            this.addMealHandler(
                this.state.meals2.breakfasts[arg].ing1,
                this.state.meals2.breakfasts[arg].ing1Value,
                this.state.meals2.breakfasts[arg].ing2,
                this.state.meals2.breakfasts[arg].ing2Value,
                // this.state.meals.breakfasts[arg].ing3,
                // this.state.meals.breakfasts[arg].ing3Value,
                // this.state.meals.breakfasts[arg].ing4,
                // this.state.meals.breakfasts[arg].ing4Value
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

        //make array which is copy of the state
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

    // ----------------------SENDING PRODUCTS TO FIREBASE END--------------------------------------------

    //-----------------------ADDING CUSTOM RECIPES & SENDING TO FIREBASE START--------------------------------------------------
    addMealInputsHandler (event, type){
        const updatedRecipe = {
            ...this.state.addMeal
        }
        updatedRecipe.breakfasts[type] = event.target.value
        this.setState({addMeal: updatedRecipe})
    }

    sendCustomRecipeHandler =() => {
        const updatedRecipe = Object.entries({
            ...this.state.meals2.breakfasts
        })

        const newRecipe = [this.state.addMeal.breakfasts.title, {
            id: this.state.addMeal.breakfasts.id,
            title: this.state.addMeal.breakfasts.title,
            name: this.state.addMeal.breakfasts.name,
            ingredients: this.state.addMeal.breakfasts.ingredients}]

        updatedRecipe.push(newRecipe)

        const newBreakfastsObject = Object.fromEntries(updatedRecipe)

        this.setState({meals2:
                                {breakfasts:
                                        newBreakfastsObject
                                }
        })

        //use axios to send recipe
        axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/meals/breakfasts/${this.state.addMeal.breakfasts.title}.json`,
            {
                id: this.state.mealsID.id + 1,
                name: this.state.addMeal.breakfasts.name,
                title: this.state.addMeal.breakfasts.title,
                ingredients: this.state.addMeal.breakfasts.ingredients,
            }
        )
            .then(response => console.log(response))

        //use axios to send current id, each new recipe will receive unique id
        axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/mealsID.json`,
            {
                id: this.state.mealsID.id + 1
            }
        )
            .then(response => console.log(response))

        //clear state (clear inputs) after sending ingredient
        this.setState({addMeal: {
                breakfasts: {
                    title:'',
                    id: 0,
                    name:'',
                    ingredients: {}
                }
            },})
        //clear state (ingredients list)


        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                    const ingredients = response.data
                    const ingredients2 = JSON.parse(JSON.stringify(ingredients));
                    this.setState({ingredientsAddedToMeal: ingredients2})
                }
            )
        // this.setState({ingredientsAddedToMeal: {}})

    }



    switchAddingIngredientsModeHandler = () => {
        this.setState({addMealMode: !this.state.addMealMode})
        console.log(this.state.addMealMode)
    }

    //-----------------------ADDING CUSTOM RECIPES & SENDING TO FIREBASE END----------------------------------------------------

    componentDidMount() {

        //póki co prymitywne pobieranie całej bazy danych z firebase
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {

                const ingredients = response.data
                const ingredients2 = JSON.parse(JSON.stringify(ingredients));

                this.setState({ingredients: ingredients})
                this.setState({ingredientsAddedToMeal: ingredients2})
                }
            )
        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/ingredientsID.json')
            .then(response => {
                    this.setState({ingredientsID: response.data})
                }
            )

        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/mealsID.json')
            .then(response => {
                    this.setState({mealsID: response.data})
                }
            )

        axios.get('https://menu-b8774-default-rtdb.firebaseio.com/meals.json')
            .then(response => {
                    this.setState({meals2: response.data})
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
                    <Route path="/przepisy/dodaj">
                        <RecipesModal
                            ingredientsList = {this.state.ingredientsAddedToMeal}
                            addIngredient={this.addIngredientHandler}
                            switchAddingIngredientsMode = {this.switchAddingIngredientsModeHandler}
                            addMealInputs={this.addMealInputsHandler.bind(this)}
                            sendCustomRecipe = {this.sendCustomRecipeHandler}
                            inputValues={this.state.addMeal}
                        />
                    </Route>
                    <Route path="/przepisy">
                        <Recipes
                            addMeal = {this.addMealHandler.bind(this)}
                            // addMeal2 = {this.addMealHandler2.bind(this)}
                            ingredientsList = {this.state.ingredients}
                            // meals={this.state.meals}
                            meals2={this.state.meals2}
                            productCounter = {this.state.addMeal.counter}
                            switchAddingIngredientsMode = {this.switchAddingIngredientsModeHandler}
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