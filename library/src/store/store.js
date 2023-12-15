import {configureStore} from '@reduxjs/toolkit'
import bookSlise from './book'

export default configureStore({
    reducer:{
        Book: bookSlise
    }
})