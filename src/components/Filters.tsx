import React from 'react';
import Sidebar from "./Sidebar";
import FilterSvg from "./icons/FilterSvg";
import {Option} from "./SidebarOptions";
import AllSvg from "./icons/AllSvg";
import StarSvg from "./icons/StarSvg";
import DoneSvg from "./icons/DoneSvg";
import WaitingSvg from "./icons/WaitingSvg";
import {TaskFilters} from "./types/Filters";
import {tasksStore} from "../services/TaskService";
import {observer} from "mobx-react-lite";

const filtersList: Option[] = [
    { id: TaskFilters.All, label: "Все задачи", icon: <AllSvg /> },
    { id: TaskFilters.Favorite, label: "Избранное", icon: <StarSvg /> },
    { id: TaskFilters.Done, label: "Завершенные", icon: <DoneSvg /> },
    { id: TaskFilters.InProgress, label: "В процессе", icon: <WaitingSvg /> },
];

const header = {
    label: "Фильтры",
    icon: <FilterSvg />
}

const Filters = observer(() => {
    return (
        <Sidebar
            header={header}
            options={filtersList}
            currentOption={tasksStore.filter}
            onChangeOption={(newOption) => tasksStore.setFilter(newOption)}
        />
    );
});


export default Filters;