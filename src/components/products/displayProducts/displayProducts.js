import React from "react";

import Product from '../product/product';

const displayProducts = (props) => {

    const ingredients = props.allIngredients.map((ingredient) => {
        return <Product
                name={ingredient[1].name}
                key={ingredient[1].id}
                add={() => props.addIngredient(ingredient[0])}
            />
    })

    return (

<>
    {ingredients}
</>

    )

}

export default displayProducts;

