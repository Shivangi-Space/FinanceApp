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

        updateTransaction: (state, action) => {
    const { id, updatedData } = action.payload;
    const index = state.list.findIndex(item => item.id === id);
    
    if (index !== -1) {
        const oldItem = state.list[index];
        
        if (oldItem.type.toLowerCase() === 'income') {
            state.balance -= oldItem.amount;
            state.income -= oldItem.amount;
        } else {
            state.balance += oldItem.amount;
            state.expense -= oldItem.amount;
        }

        state.list[index] = { ...oldItem, ...updatedData };
        const newItem = state.list[index];

        if (newItem.type.toLowerCase() === 'income') {
            state.balance += newItem.amount;
            state.income += newItem.amount;
        } else {
            state.balance -= newItem.amount;
            state.expense += newItem.amount;
        }
    }
},
    },
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;