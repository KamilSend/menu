import React from 'react';

import DisplayProducts from './displayProducts/displayProducts'
import Shoplist from "../../containers/Shoplist/Shoplist";

import styles from './products.module.scss'

const products =(props) => {

    const allIngredients = Object.keys(props.ingredientsList)
        .map((key) => [(key), props.ingredientsList[key]]);

    return(
        <>
        <div className={styles.Products}>
            <div>
                <h3>Nabiał</h3>
                <DisplayProducts
                    allIngredients = {allIngredients}
                    // from = '0'
                    // to = '11'
                    addIngredient = {props.addIngredient}
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