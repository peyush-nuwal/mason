import { createSlice } from "@reduxjs/toolkit";

const storedUserData = JSON.parse(localStorage.getItem("userData")) || {}
const initialState = {
    firstName: storedUserData.firstName || "",
    lastName: storedUserData.lastName || "",
    email: storedUserData.email || "",
    password: storedUserData.password || "",
    isLoggedIn: storedUserData.isLoggedIn || false,
    isCartOpen: storedUserData.isCartOpen|| false,
    orders: storedUserData.orders || [],
    address: storedUserData.address || [],
}


const updateLocalStorage = (state) => {
    localStorage.setItem("userData", JSON.stringify({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        isLoggedIn: state.isLoggedIn,
        isCartOpen: state.isCartOpen,
        orders: state.orders,
        address: state.address,
    }));
};
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
           
            state.firstName = action.payload.firstName
            state.lastName =action.payload.lastName
            state.email = action.payload.email
            state.password = action.payload.password
            state.isLoggedIn = true
            updateLocalStorage(state);
        },
        logout: (state) => {
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.password = ""
            state.isLoggedIn = false
            state.orders = []
            localStorage.removeItem("userData");
        },
        addOrder: (state, action) => {
            const { id } = action.payload;
            const existingOrder = state.orders.find((order) => order.id === id)
            if (existingOrder) {
                existingOrder.quantity += 1
            } else {
                state.orders.push({ id, quantity: 1 })
            }
            updateLocalStorage(state);
        },
        removeOrder: (state,action) => {
            const { id } = action.payload;
            const existingOrder = state.orders.find((order) => order.id === id)
            if (existingOrder) {
                if (existingOrder.quantity > 1) {
                    existingOrder.quantity -= 1
                }
                else {
                    state.orders = state.orders.filter((order) => order.id !== id)
                }

            }
            updateLocalStorage(state);

        },
        clearOrder:(state,action)=>{
            const { id } = action.payload;
           
            state.orders=state.orders.filter((order) => order.id !== id)
            updateLocalStorage(state);
        },
        handleCart:(state,action)=>{
            state.isCartOpen = action.payload
        },
        addAddress:(state,action)=>{
            state.address.push(action.payload)
            updateLocalStorage(state);
        },
        removeAddress:(state,action)=>{
            const {index} = action.payload
            state.address = state.address.filter((_,i)=>i!==index)
            updateLocalStorage(state);
        }

    }
 }
)
export const {login,logout,addOrder,removeOrder,handleCart,clearOrder,addAddress,removeAddress} = UserSlice.actions
export default UserSlice.reducer