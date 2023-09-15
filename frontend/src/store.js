import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import panierSliceReducer from './slices/panierSlice'
import authSliceReducer from  './slices/authSlice'


const store = configureStore({
    reducer:{
     [apiSlice.reducerPath]: apiSlice.reducer, // api connexion
     panier: panierSliceReducer,
     auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>   // middleware de redux qui gere automatiquement le state
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;