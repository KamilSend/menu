import React, { Component } from 'react'

import styles from './Shoplist.module.css'

class Shoplist extends Component{

    render(){

        const ingredients = this.props.allIngredients.map((ingredient) => {
            if (ingredient[1].amount) {
                return <li key={ingredient[1].id}>{ingredient[1].name} {ingredient[1].amount}</li>
            } else return null;
        })

        return(
            <>
                <h1>Lista zakupów</h1>
                <ul className={styles.Shoplist}>{ingredients}</ul>
            </>
        )
    }
}

export default Shoplist;