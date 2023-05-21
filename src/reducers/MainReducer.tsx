import {IUser, states} from "../interfaces/BasicInterface";

const initialState:states = {
    status:'idle',
    products:[],
    product:[],
    curUser: {} as IUser,
    isAuth: false,
    filter:[],
    filters:{},
    isAdmin:false
}

function mainReducer(state = initialState,action:any){
    switch (action.type){
        case 'Product_Fetched':
            return{
                ...state,
                status:'idle',
                product:action.payload
            }
        case 'Products_Fetched':
            return {
                ...state,
                status: 'idle',
                products:action.products
            }
        case 'USER_FETCHED':
            return {
                ...state,
                loadingStatus: 'idle',
                curUser: action.payload
            }

        case 'SET_AUTH':
            return {
                ...state,
                loadingStatus: 'idle',
                isAuth: action.payload
            }
        case 'SET_ADMIN':
            return {
                ...state,
                loadingStatus: 'idle',
                isAdmin: action.payload
            }
        case 'Filter_Fetched':
            return{
                ...state,
                status: 'idle',
                filter:action.filter
            }
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: action.payload
            };
        default: return state
    }
}
export default mainReducer;