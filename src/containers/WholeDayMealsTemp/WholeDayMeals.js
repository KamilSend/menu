import React, { Component } from 'react'
import Shoplist from "../Shoplist/Shoplist";

// import Meals from '../../components/meals/meals'

class WholeDayMeals extends Component {



    state={

    }

    // Plan jest taki że po kliknięciu w dany jadłospis dodam od razu posiłki w 'meals',
    // za pomocą funkcji addmeal, w state będzie przechowywana lista posiłków dla danego jadłospisu,
    // liczba kalorii na początek może być na sztywno, ale finalnie może być lepiej ją policzyć z produktów
    // zastanowić się czy by na przyszłość nie dodać rozkładu składników odżywczych

    render() {

        const allIngredients = Object.keys(this.props.ingredientsList)
            .map((key) => [(key), this.props.ingredientsList[key]]);


        return(
            <>
                <div>Wybierz jadłospis dla siebie</div>
                <span onClick={() => {
                    this.props.addWholeDayMeals('meal1')
                }}>Dodaj próbny jadłospis</span>
                <Shoplist
                    allIngredients={allIngredients}
                />
            </>

        )
    }
}

export default WholeDayMeals