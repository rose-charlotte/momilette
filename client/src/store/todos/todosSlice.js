import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        title: "Dood",
        done: false,
    },
];

function getNextId(todos) {
    const lastTodo = todos.at(-1);

    if (lastTodo) {
        return lastTodo.id + 1;
    }

    return 1;
}

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({
                ...action.payload,
                id: getNextId(state),
                done: false,
            });
        },

        deleteTodo: (state, action) =>
            state.filter(todo => todo.id !== action.payload),

        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);

            if (todo) {
                todo.done = !todo.done;
            }
        },
    },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
