export interface ITodoItem {
    text: string;
}
export interface IAddTodoPayload {
    todoItem: ITodoItem;
}
export interface IGetTodosResponse {
    todoList: ITodoItem[];
}
export declare function validateTodo(todoItem: ITodoItem): {
    valid: boolean;
    message: string;
} | {
    valid: boolean;
    message?: undefined;
};
