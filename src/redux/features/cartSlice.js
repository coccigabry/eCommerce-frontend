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
        },
        removeProduct: (state, action) => {
            const { product } = action.payload
            state.products = state.products.filter(item =>
                JSON.stringify(item) !== JSON.stringify(product)
            )
            state.total -= action.payload.price * action.payload.quantity
            state.amount -= 1
        },
        clearCart: (state) => initialState,
        toggleCartAmount: (state, action) => {
            const { product } = action.payload
            state.products = state.products.map(item => {
                if (JSON.stringify(item) == JSON.stringify(product)) {
                    if (action.payload.type === 'increase') {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    if (action.payload.type === 'decrease') {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                }
                return item
            })
        },
        getCartTotal: (state) => {
            let { total, amount } = state.products.reduce((cartTotal, cartItem) => {
                const { price, quantity } = cartItem
                const itemTotal = price * quantity
                cartTotal.total += itemTotal
                cartTotal.amount += quantity
                return cartTotal
            }, { total: 0, amount: 0 })
            state.total = parseFloat(total.toFixed(2))
            state.amount = amount
        },
    }
})


export const {
    addProduct,
    removeProduct,
    clearCart,
    toggleCartAmount,
    getCartTotal,
} = cartSlice.actions

export default cartSlice.reducer