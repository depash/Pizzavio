const CREATE_PIZZA = 'pizza/CREATE_PIZZA';
const DELETE_PIZZA = 'pizza/DELETE_PIZZA';
const GET_PIZZA = 'pizza/GET_PIZZA'
const PUT_PIZZA = 'pizza/PUT_PIZZA'

const createPizza = (pizza) => ({
    type: CREATE_PIZZA,
    payload: pizza
});

const getPizza = (pizza) => ({
    type: GET_PIZZA,
    payload: pizza
})

const deletePizza = () => ({
    type: DELETE_PIZZA
})

const putPizza = (pizza) => ({
    type: PUT_PIZZA,
    payload: pizza
});

export const putPizzaThunk = (pizzaId, price, Ingredient, whatToDo) => async (dispatch) => {
    const response = await fetch(`/api/pizza/${pizzaId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price,
            Ingredient,
            whatToDo
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(putPizza(data))
        return null;
    }
}

export const getIndividualPizza = (pizzaId) => async (dispatch) => {
    const response = await fetch(`/api/pizza/${pizzaId}/edit/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getPizza(data))
        return null;
    }
}

export const makePreMadePizza = (cartId, Ingredient, price) => async (dispatch) => {
    const response = await fetch('/api/pizza/premade/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cartId,
            Ingredient,
            price
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createPizza(data))
        return null;
    }
}

export const makePizza = (cartId) => async (dispatch) => {
    const response = await fetch('/api/pizza/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cartId
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createPizza(data))
        return null;
    }
}

export const ChangeingNumOfPizza = (total, pizzaId) => async (dispatch) => {
    const response = await fetch(`/api/pizza/${pizzaId}/total/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            total
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(putPizza(data))
        return null;
    }
}

export const deletePizzaThunk = (pizzaId) => async (dispatch) => {
    const response = await fetch(`/api/pizza/${pizzaId}/`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deletePizza())
        return response;
    }
}





const pizzaReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PIZZA:
            return action.payload
        case DELETE_PIZZA:
            return { pizza: null }
        case PUT_PIZZA:
            return action.payload
        case GET_PIZZA:
            return action.payload
        default:
            return state;
    }
}

export default pizzaReducer
