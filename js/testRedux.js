const WITHDRAW_MONY = "WITHDRAW_MONY";
const DEPOSITE_MONY = "DEPOSITE_MONY";

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


const store = $redux.createStore(bankReducer)

// store.dispatch(DEPOSITE(200) )

// console .log (store)
// console .log (store.getState())


let amountInput = document.querySelector("#amount");

let amountValue = document.querySelector("#value");

amountValue.innerHTML = store.getState();

document.querySelector("#WITHDRAW").addEventListener('click',()=>{
    store.dispatch(WITHDRAW(+amountInput.value));
})

document.querySelector("#DEPOSITE").addEventListener('click',()=>{
    store.dispatch(DEPOSITE(+amountInput.value));
})

store.subscribe(()=>{
    console.log("current state",store.getState());
    amountValue.innerHTML = store.getState();

})