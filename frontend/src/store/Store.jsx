import {configureStore} from '@reduxjs/toolkit'
import TokenSlice from '../slice/TokenSlice'

export const Store=configureStore({
    devTools:true,
    reducer:{
        token:TokenSlice
    }
})
