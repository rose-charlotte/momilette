import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../store/todos/todosSlice";

export function TodoListItem({ todo }) {
    const dispatch = useDispatch();

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                >
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton
                role={undefined}
                onClick={() => dispatch(toggleTodo(todo.id))}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.done}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText
                    id={todo.id}
                    primary={todo.title}
                />
            </ListItemButton>
        </ListItem>
    );
}
