import React from 'react';
import Sidebar from "./Sidebar";
import {Option} from "./SidebarOptions";
import {tasksStore} from "../../../services/TaskService";
import {Order} from "../types/Order";
import {observer} from "mobx-react-lite";

const sortOrderList: Option[] = [
    { id: Order.Ascending, label: "По возрастанию" },
    { id: Order.Descending, label: "По убыванию" },
];

const header = {
    label: "Порядок",
}

const Sorting = observer(() => {
    return (
        <Sidebar
            header={header}
            options={sortOrderList}
            currentOption={tasksStore.sortOrder}
            onChangeOption={(newOption)=>tasksStore.setSortOrder(newOption)}
        />
    );
});

export default Sorting;