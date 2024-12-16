'use client';
import { createSlice } from '@reduxjs/toolkit';

let cartItems: any[] = [];
let buyNowItems: any[] = [];

if (typeof window !== "undefined") {
  // Ensure localStorage is only accessed in the browser
  cartItems = localStorage?.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : [];
  buyNowItems = localStorage?.getItem("buyNow") ? JSON.parse(localStorage.getItem("buyNow") as string) : [];
}

interface Product {
    _id: string;
    isAvailable: boolean;
    // Add other properties of the product as needed
}

const initialState = {
    products: [] as Product[],
    loading: false,
    cartItemsProducts: {
        cartItems: cartItems,
        totalPrice: cartItems?.reduce((acc: number, item: any) => acc + item.totalPrice, 0),
    },
    buyNow: {
        totalPrice: 0,
        cartItems: buyNowItems,
    },
    totalPrice: 0,
    searchProducts: [],
    GlobalFeatureProduct: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
        GetAllProducts :(state, action) => {
            state.products = action.payload?.filter((product: any) => product.isAvailable)
        },

        IsLoading : (state, action) => {
            state.loading = !state.loading
        },

        ChangeProductVisibility: (state, action) => {
            const index = state.products.findIndex((product: any) => product._id === action.payload);
            if (index !== -1) {
                state.products[index].isAvailable = !state.products[index].isAvailable;
            }
        },
        
        AddGlobalFeatureProduct: (state, action) => {
            state.GlobalFeatureProduct = action.payload;
        },

        addProductToCart: (state, action) => {
            // need to increase quantity if product is same
            // need to add new item  the item is weightSelected is different 
            const index = state.cartItemsProducts.cartItems.findIndex((item: any) => (item._id === action.payload._id));
            if (index !== -1) {
               state.cartItemsProducts.cartItems[index].quantity += 1;
               state.cartItemsProducts.cartItems[index].totalPrice = (parseFloat(state.cartItemsProducts.cartItems[index].price) * parseInt(state.cartItemsProducts.cartItems[index].quantity));
            } else {
                state.cartItemsProducts.cartItems.push(action.payload);
                state.cartItemsProducts.cartItems[state.cartItemsProducts.cartItems.length - 1].totalPrice = (parseFloat(action.payload.price) * parseInt(action.payload.quantity));
            }

            const totalPrice = state.cartItemsProducts.cartItems.reduce((acc: number, item: any) => acc + item.totalPrice,0);
            state.cartItemsProducts.totalPrice = totalPrice;

            localStorage.setItem("cart", JSON.stringify(state.cartItemsProducts.cartItems));
        },
        
        

        addTotalPrice: (state, action) => {
            state.totalPrice += action.payload;
        },

        removeTotalPrice: (state) => {
            state.totalPrice = 0;
        },

        addTotalAtOnce: (state, action) => {
            state.totalPrice = action.payload;
        },  

        removeProductFromCart: (state, action) => {
            // need to remove if weightSelected is matched and id is matched
            // u need to remove the product which is matched with id and weightSelected if both are same then only remove other wise not
            const index = state.cartItemsProducts.cartItems.findIndex((item: any) => (item._id === action.payload.id ));
            if (index !== -1) {
                state.cartItemsProducts.cartItems.splice(index, 1);                
            }

            const totalPrice = state.cartItemsProducts.cartItems.reduce((acc: number, item: any) => acc + item.totalPrice,0);
            state.cartItemsProducts.totalPrice = totalPrice;
            localStorage.setItem("cart", JSON.stringify(state.cartItemsProducts.cartItems));

        },

        handelQuantityChange: (state, action) => {
            const index = state.cartItemsProducts.cartItems.findIndex((item:any )=> (item._id === action.payload.id ));
            if (index !== -1) {
                state.cartItemsProducts.cartItems[index].quantity = action.payload.quantity;
                state.cartItemsProducts.cartItems[index].totalPrice = (parseFloat(state.cartItemsProducts.cartItems[index].price) * parseInt(state.cartItemsProducts.cartItems[index].quantity));
            }

            const totalPrice = state.cartItemsProducts.cartItems.reduce((acc : any, item : any) => acc + item.totalPrice,0);
            state.cartItemsProducts.totalPrice = totalPrice;
            localStorage.setItem("cart", JSON.stringify(state.cartItemsProducts.cartItems));
        }
        ,

        addProductToBuyNow: (state, action) => {
            const index = state.buyNow.cartItems.findIndex((item:any) => (item._id === action.payload._id));
            if (index !== -1) {
               state.buyNow.cartItems[index].quantity += 1;
               state.buyNow.cartItems[index].totalPrice = (parseFloat(state.buyNow.cartItems[index].price) * parseInt(state.buyNow.cartItems[index].quantity));
            } else {
                state.buyNow.cartItems.push(action.payload);
                state.buyNow.cartItems[state.buyNow.cartItems.length - 1].totalPrice = (parseFloat(action.payload.price) * parseInt(action.payload.quantity));
            }

            const totalPrice = state.buyNow.cartItems.reduce((acc, item) => acc + item.totalPrice,0);
            state.buyNow.totalPrice = totalPrice;
            // localStorage.setItem("buyNow", JSON.stringify(state.buyNow.cartItems));
        },

        removeAllProductFromCart: (state, action) => {
            state.cartItemsProducts.cartItems = [],
            localStorage.removeItem("cart");
        },

        setSearchProducts: (state, action) => {
            if(action.payload.length === 0) {
                state.searchProducts = [];
                return;
            }
            
            state.searchProducts = action.payload;
        },

        removeSearchProducts: (state) => {
            state.searchProducts = [];
        }
    },
});

// how to export extraReducers


export const { 
    // addNewProductToStore, 
    GetAllProducts , 
    IsLoading, 
    ChangeProductVisibility,
    AddGlobalFeatureProduct,
    addProductToCart,
    removeProductFromCart,
    addTotalPrice,
    removeTotalPrice,
    addTotalAtOnce,
    handelQuantityChange,
    addProductToBuyNow,
    removeAllProductFromCart,
    setSearchProducts,
    removeSearchProducts
} = productSlice.actions;
export default productSlice.reducer;