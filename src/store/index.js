import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/heroesFiltersSlice';
import { apiSlice } from '../api/apiSlice';

const stingMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store
// } 

// const store = createStore(
//                 combineReducers({heroes, filters}),
//                 compose(
//                     applyMiddleware(ReduxThunk, stingMiddleware),
//                     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                 )
//             )

const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stingMiddleware, apiSlice.middleware),
    reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
