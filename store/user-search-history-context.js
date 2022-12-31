import { createContext, useReducer } from "react";

export const UserSearchHistoryContext = createContext({
    SearchHistory: [],
    addUserSearchHistory: ({ 
        besinAdi,
        besinMiktari, 
        eklemeTarihi,
        kalori,
        karbonhidrat,
        protein,
        userId,
        yag
    }) => {},
    setUserSearchHistory: (userFoodData) => {},
});


function userSearchHistoryReducer( state , action ){

    switch(action.type){
        case 'ADD':
            return [...state,action.payload];
        default:
            return state;
    }
}

function UserSearchHistoryContexProvider({children}){

    const [ userSearchHistoryState , dispatch ] =  useReducer( userSearchHistoryReducer , []);

    function addUserSearchHistory(data){
        dispatch( {type: 'ADD' , payload: data} );
    }
    const value = {
        SearchHistory: userSearchHistoryState,
        addUserSearchHistory: addUserSearchHistory,  
    };
    return(
        <UserSearchHistoryContext.Provider value={value}>{children}</UserSearchHistoryContext.Provider>
    );
}

export default UserSearchHistoryContexProvider;