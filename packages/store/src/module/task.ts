import ApiEvent from '@store/api';
import { ITaskItem } from '@xynotes/typings';
import { debounce } from '@xynotes/utils';
import { reactive } from 'vue';

/**
 * 任务状态
 */
const state = reactive({
  // 任务列表
  taskList: {
    A: new Array<ITaskItem>(),
    B: new Array<ITaskItem>(),
    C: new Array<ITaskItem>(),
    D: new Array<ITaskItem>()
  }
});

/**
 * 获取任务列表数据并更新到状态管理中
 * 该函数从API获取所有任务项，并根据任务所属象限将它们分别存储到对应的状态列表中
 */
const fetchTaskList = async () => {
  state.taskList = {
    A: new Array<ITaskItem>(),
    B: new Array<ITaskItem>(),
    C: new Array<ITaskItem>(),
    D: new Array<ITaskItem>()
  };
  const taskList = await ApiEvent.api.apiFetchTaskListData();
  taskList.forEach((task) => {
    state.taskList[task.quadrant].push(task);
  });
};

/**
 * 保存或更新任务项
 * @param task 任务项
 */
const saveTask = async (task: ITaskItem) => {
  // 调用API保存或更新任务
  const result = await ApiEvent.api.apiSaveOrUpdateTask(task);
  // 获取任务所属象限的映射表
  const quadrant = state.taskList[result.quadrant];
  // 将任务保存到对应的象限映射表中
  const local = quadrant.find((t) => t.taskId === task.taskId);
  if (local) {
    Object.assign(local, result);
  } else {
    quadrant.push(result);
  }
};

// 删除任务项
const deleteTask = async (task: ITaskItem) => {
  // 调用API删除任务
  await ApiEvent.api.apiDeleteTask(task);
  // 获取任务所属象限的映射表
  const quadrant = state.taskList[task.quadrant];
  // 将任务从对应的象限映射表中删除
  const index = quadrant.findIndex((t) => t.taskId === task.taskId);
  quadrant.splice(index, 1);
};

// 更新排序
const orderTask = debounce(async () => {
  // 调用API更新任务顺序
  const taskListA = state.taskList.A.map((task, index) => ({
    ...task,
    priority: state.taskList.A.length - index
  }));
  const taskListB = state.taskList.B.map((task, index) => ({
    ...task,
    priority: state.taskList.B.length - index
  }));
  const taskListC = state.taskList.C.map((task, index) => ({
    ...task,
    priority: state.taskList.C.length - index
  }));
  const taskListD = state.taskList.D.map((task, index) => ({
    ...task,
    priority: state.taskList.D.length - index
  }));
  const taskList = [].concat(taskListA, taskListB, taskListC, taskListD).map((task) => ({
    taskId: task.taskId,
    quadrant: task.quadrant,
    priority: task.priority
  }));
  await ApiEvent.api.apiSaveOrUpdateTaskSort(taskList);
}, 500);

// actions
export const taskStoreAction = { fetchTaskList, saveTask, deleteTask, orderTask };

// state
export const taskStoreState = state;
