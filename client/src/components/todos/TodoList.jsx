import { List } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "../common/Button";
import { TodoListItem } from "./TodoListItem";

export function TodoList() {
    const todos = useSelector(state => state.todos);

    console.log(todos);

    return (
        <>
        <List sx={{ bgcolor: "background.paper" }}>
            {todos.map(todo => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </List>
        <Button />
        </>
    );
}
