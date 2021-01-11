import React from 'react'

import styles from './addProduct.module.scss'

const addProduct = (props) => (
    <div className={styles.addProduct}>
        <h3>Dodaj swój własny produkt</h3>
        <input
            onChange={(event) => props.inputAddProduct(event, 'title')}
            type="text"
            placeholder="Podaj tytuł produktu"
            value={props.inputValues.title}
        />
        <input
            onChange={(event) => props.inputAddProduct(event, 'name')}
            type="text"
            placeholder="Podaj dokładną nazwę produktu"
            value={props.inputValues.name}
        />
        <input
            onChange={(event) => props.inputAddProduct(event, 'kcal')}
            type="text"
            placeholder="Podaj kaloryczność"
            value={props.inputValues.kcal}
        />
        <input
            onChange={(event) => props.inputAddProduct(event, 'price')}
            type="text"
            placeholder="Podaj cenę"
            value={props.inputValues.price}
        />
        <button
            onClick={props.submitProduct}
            type="submit"
        >
            Wyślij
        </button>
    </div>
)

export default addProduct