import React from 'react';

import styles from './product.module.css'

const product =(props) => (
    <span
        onClick={() => props.add(props.name)}
        className={styles.Product}
    >{props.name}</span>
)



export default product