import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    products: [],
    amount: 0,
    total: 0
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            state.amount += 1
            state.total += action.payload.price * action.payload.quantity
        }
    }
})


export const { addProduct } = cartSlice.actions
export default cartSlice.reducer