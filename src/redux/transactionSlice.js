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
            
            const type = action.payload.type.toLowerCase();
            const amount = action.payload.amount;

            if (type === 'income') {
                state.income += amount;
                state.balance += amount;
            } else {
                state.expense += amount;
                state.balance -= amount;
            }
        },

        deleteTransaction: (state, action) => {
            const id = action.payload;
            const itemToDelete = state.list.find(item => item.id === id);

            if (itemToDelete) {
                const type = itemToDelete.type.toLowerCase();
                const amount = itemToDelete.amount;

                if (type === 'income') {
                    state.income -= amount;
                    state.balance -= amount;
                } else {
                    state.expense -= amount;
                    state.balance += amount;
                }
                
                state.list = state.list.filter(item => item.id !== id);
            }
        },
    },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;