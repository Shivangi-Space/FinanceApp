import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        list: [],
        balance: 0,
        income: 0,
        expense: 0,
    },
    reducers: {
        addTransaction: (state, action) => {
            state.list.unshift(action.payload);
            if(action.payload.type === 'income') {
                state.income += action.payload.amount;
                state.balance += action.payload.amount;
            } else {
                state.expense += action.payload.amount;
                state.balance -=action.payload.amount;
            }
        },

        deleteTransaction: (state, action) => {

        },
    },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;