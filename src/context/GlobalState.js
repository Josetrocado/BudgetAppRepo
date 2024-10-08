import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer';

const initialState = {
    incomeTransactions:JSON.parse(localStorage.getItem('incomeTransactions')) || [],
    expenseTransactions:JSON.parse(localStorage.getItem('expenseTransactions')) ||[],
};

 const GlobalContext = createContext(initialState);

 const GlobalContextProvider = ({children}) => {

    const [state, dispatch ] = useReducer(AppReducer,initialState);
    
    useEffect(()=> {
        localStorage.setItem("incomeTransactions",JSON.stringify(state.incomeTransactions));
        localStorage.setItem("expenseTransactions",JSON.stringify(state.expenseTransactions));
    })

    const addIncome = (incomeTransaction) =>{ 
        dispatch({
           type:"ADD_INCOME",
           payload: incomeTransaction,
        });
    };
    
    const addExpense = (expenseTransaction) =>{ 
        dispatch({
           type:"ADD_EXPENSE",
           payload: expenseTransaction,
        });
    };

    const deleteTransaction = (id) =>{
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id,
        });
    };

    return (

        <GlobalContext.Provider value={{
            incomeTransactions: state.incomeTransactions,
            expenseTransactions: state.expenseTransactions,
            addIncome,
            addExpense,
            deleteTransaction,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalContextProvider};