import React from 'react';

import DisplayProducts from './displayProducts/displayProducts'
import Shoplist from "../../containers/Shoplist/Shoplist";
import AddProduct from './addProduct/addProduct'

import styles from './products.module.scss'

const products =(props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    // console.log(allIngredients)

    return(
        <>
        <div className={styles.Products}>
            <div>
                <h3>Nabiał</h3>
                <DisplayProducts
                    allIngredients = {allIngredients}
                    addIngredient = {props.addIngredient}
                />

            </div>
            <div>
                <AddProduct
                    inputAddProduct = {props.inputAddProduct}
                    submitProduct = {props.submitProduct}
                    inputValues = {props.inputValues}
                />
            </div>
        </div>
            <Shoplist
                allIngredients = {allIngredients}
            />
        </>
    )
}


export default products