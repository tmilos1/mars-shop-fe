import * as actionTypes from './actions'

const initialState = {
    cart: null,
    totalAmount: 0.0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT: 
            return {
                ...state,
            }
        case actionTypes.REMOVE_PRODUCT: 
            return {
                ...state,
            }          
        default:
            return state  
    }
}

export default reducer
