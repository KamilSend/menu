import React from 'react'

const meal = (props) => {

    return(
        <div>
            <span onClick={() =>
                props.addMeal(
                    props.ing1, props.ing1Value,
                    props.ing2, props.ing2Value,
                    props.ing3, props.ing3Value,
                )}
            >{props.name}</span>
        </div>
    )
}

export default meal