(function () {
    const CustomRedux = (function (){
     function createStore (reducer){
        let state ;
        let Listners = [];
        const getState = () => state ;
        const dispatch = (action) => {
            state = reducer(state , action);
            Listners.forEach(Listner => Listner());
        }
        const subscribe = (Listner) => {
            Listners.push(Listner);
            console.log(Listners);
        }
        dispatch ({})
        
        return {
            getState,
            dispatch,
            subscribe
        }
    
     }
    return {createStore}
    })()

    if(!window.CustomRedux){
        window.$redux = window.CustomRedux = CustomRedux;
    }

})()