import React from 'react';

import styles from './product.module.scss'

const product =(props) => {

    // console.log(props.name)


    return(
        <span
            onClick={() => props.add(props.name)}
            className={styles.Product}
        >{props.name}</span>
        )

}



export default product