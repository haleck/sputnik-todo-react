import React from 'react';
import Sidebar from "./Sidebar";
import {Option} from "./SidebarOptions";
import {Sort} from "./types/Sort";
import {tasksStore} from "../services/TaskService";
import SortSvg from "./icons/SortSvg";
import {observer} from "mobx-react-lite";

const sortList: Option[] = [
    { id: Sort.Creation, label: "По дате создания" },
    { id: Sort.Update, label: "По дате обновления" },
    { id: Sort.Title, label: "По названию" },
];

const header = {
    label: "Сортировка",
    icon: <SortSvg />
}

const Sorting = observer(() => {
    return (
        <Sidebar
            header={header}
            options={sortList}
            currentOption={tasksStore.sortField}
            onChangeOption={(newOption)=>tasksStore.setSortField(newOption)}
        />
    );
});

export default Sorting;