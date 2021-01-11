import React from 'react'

import styles from './addProduct.module.scss'

const addProduct = (props) => (
    <div className={styles.addProduct}>
        <h3>Dodaj swój własny produkt</h3>
        <input
            onChange={(event) => props.inputAddProduct(event, 'title')}
            type="text"
            placeholder="Podaj tytuł produktu"/>
        <input
            onChange={(event) => props.inputAddProduct(event, 'name')}
            type="text"
            placeholder="Podaj dokładną nazwę produktu"/>
        <input
            onChange={(event) => props.inputAddProduct(event, 'kcal')}
            type="text"
            placeholder="Podaj kaloryczność"/>
        <input
            onChange={(event) => props.inputAddProduct(event, 'price')}
            type="text"
            placeholder="Podaj cenę"/>
        <button
            onClick={props.submitProduct}
            type="submit"
        >
            Wyślij
        </button>
    </div>
)

export default addProduct