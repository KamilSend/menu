import React, { Component } from 'react'
import axios from '../../../axios-meals'

import styles from './addProduct.module.scss'

class AddProduct extends Component {
    //
    // state={
    //     title: null,
    //     name: null,
    //     kcal: null,
    //     id: 0,
    //     price: null,
    //     amount: 0,
    // }
    //
    // inputHandler(event, type) {
    //     this.setState({[type]:event.target.value})
    // }
    //
    // handleSubmit = () => {
    //
    // axios.put(`https://menu-b8774-default-rtdb.firebaseio.com/ingredients/${this.state.title}.json`,
    //
    //             {
    //                 id:10,
    //                 name: this.state.name,
    //                 amount: this.state.amount,
    //                 kcal: this.state.kcal,
    //                 price: this.state.price
    //         }
    //     )
    //     .then(response => console.log(response))
    //
    //
    //     console.log(this.state)
    // }

    render(){
     return(
         <div className={styles.addProduct}>
             <h3>Dodaj swój własny produkt</h3>
             <input
                 onChange={(event) => this.props.inputAddProduct(event, 'title')}
                 type="text"
                 placeholder="Podaj tytuł produktu"/>
             <input
                 onChange={(event) => this.props.inputAddProduct(event, 'name')}
                 type="text"
                 placeholder="Podaj dokładną nazwę produktu"/>
             <input
                 onChange={(event) => this.props.inputAddProduct(event, 'kcal')}
                 type="text"
                 placeholder="Podaj kaloryczność"/>
             <input
                 onChange={(event) => this.props.inputAddProduct(event, 'price')}
                 type="text"
                 placeholder="Podaj cenę"/>
                 <button
                     onClick={this.props.submitProduct}
                     type="submit"
                 >
                     Wyślij
                 </button>
         </div>
     )
 }

}

export default AddProduct