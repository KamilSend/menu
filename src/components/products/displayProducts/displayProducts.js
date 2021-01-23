import React from "react";

import Product from '../product/product';

const displayProducts = (props) => {

    // console.log(props.allIngredients)

    const ingredients = props.allIngredients.map((ingredient) => {
        // console.log(ingredient[1].name)
        return <Product
                name={ingredient[1].name}
                // name={ingredient[0]}
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

