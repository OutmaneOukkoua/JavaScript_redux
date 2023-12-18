console.log(Redux);
console.log(ReduxThunk);
const WITHDRAW_MONY = "WITHDRAW_MONY";
const DEPOSITE_MONY = "DEPOSITE_MONY";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const GET_PRODUCTS = "GET_PRODUCTS";

// Actions
const WITHDRAW = (amount) => {
    return{
        type : WITHDRAW_MONY,
        payload : amount

    }
}
const DEPOSITE = (amount) => {
    return{
        type : DEPOSITE_MONY,
        payload : amount
    }
}

const AddProducts = (product) =>{
    return{
        type : ADD_PRODUCTS,
        payload : product
    } 
}
const GetProducts = (products) =>{
    return{
        type : GET_PRODUCTS,
        payload : products
    } 
}

const FetchProducts = () =>{
    return async (dispatch) =>{
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    console.log(data);
    dispatch(GetProducts(data))
}
}

// Reducers
const bankReducer = (state = 1000 , action) =>{
    switch(action.type){
        case WITHDRAW_MONY :
            return state - action.payload;
        case DEPOSITE_MONY :
            return state + action.payload;
        default :
            return state;
    }
}

const productsReducer = (state = [] , action) =>{
    switch(action.type){
        case GET_PRODUCTS :
            return [...action.payload];
        case ADD_PRODUCTS :
            return [...state, action.payload];
        default :
            return state;
    }
}

const mainReducer = Redux.combineReducers({
    bank : bankReducer,
    products : productsReducer
})
const store = Redux.createStore(mainReducer,Redux.applyMiddleware(ReduxThunk));

// store.dispatch(WITHDRAW(100));
// store.dispatch(WITHDRAW(150));
// store.dispatch(DEPOSITE(1000));

// store.dispatch(AddProducts({id : 1,name : "product1"}))


console.log(store.getState());

let amountInput = document.querySelector("#amount");

let amountValue = document.querySelector("#value");

amountValue.innerHTML = store.getState().bank;

document.querySelector("#WITHDRAW").addEventListener('click',()=>{
    store.dispatch(WITHDRAW(+amountInput.value));
})

document.querySelector("#DEPOSITE").addEventListener('click',()=>{
    store.dispatch(DEPOSITE(+amountInput.value));
})


store.subscribe(()=>{
    console.log("current state",store.getState());
    amountValue.innerHTML = store.getState().bank;

})