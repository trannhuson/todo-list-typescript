export interface ITodosList {
    id: number;
    text: string;
    isCompleted: boolean;
    status: string;
    date: string;
}

export interface IAddNewModalProps {
    onCloseForm(): void;
    handleAddNewModal: (e: any) => void;
    editTodo: ITodosList;
}

export interface IFooterProps {
    isDisplayForm: boolean;
    setStatusFilter: (status: string) => void;
    status: string;
    numberItem: number;
    isOpen: boolean;
}

export interface ITodoItemProps {
    isDisplayForm: boolean;
    todo: ITodosList;
    index: number;
    onDelete: (id: number) => void;
    onEditTodo: (todo: ITodosList, index: number) => void;
    onCheckbox: (id: number) => void;
}

export interface ITodoListProps {
    isDisplayForm: boolean; 
    todosList: ITodosList[];
    onDelete: (id: number) => void;
    onEditTodo: (todo: ITodosList, index: number) => void;
    onCheckbox: (id: number) => void;
}

export interface IHeaderProps {
    isDisplayForm: boolean;
    isOpen: boolean;
    toggleShowAll: (isOpen: boolean) => void;
    onToggleForm: (taskEditing: ITodosList) => void;
    onSearch: (text: string, status: string) => void;
}