import {AddTask,ListTask,DeleteTask,UpdateTasks, UpdateStatus, DoneTask} from './constants';

export const getTaskList=()=>{
    return {
        type:ListTask
    }
}
export const addNewTaskAction=(data)=>{
    // xử lí api ở đây
    return {
        type:AddTask,
        payload:data
    }
}

export const removeTaskAction=(data)=>{
    return {
        type:DeleteTask,
        payload:data
    }
}

export const updateStatusAction=(data)=>{
    return {
        type:UpdateStatus,
        payload:data
    }
}

//filter : done or didn't done
export const filterTypeTask=(type)=>{
    return {
        type:type
    }
}