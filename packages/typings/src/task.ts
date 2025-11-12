/**
 * 任务项
 */
export interface ITaskItem {
  id: number;

  // 任务id
  taskId: string;

  // 任务标题
  title: string;

  // 所属象限 (A-重要且紧急, B-重要不紧急, C-不重要但紧急, D-不重要不紧急)
  quadrant: TaskQuadrant;

  // 任务状态 (0-未完成, 1-已完成)
  status: number;

  // 任务优先级 (数字越大优先级越高)
  priority: number;

  // 任务截止日期
  deadline: Date | null;

  // 任务创建时间
  createdAt: Date;

  // 任务更新时间
  updatedAt: Date;

  // 任务完成时间
  completedAt: Date | null;

  // 任务所属用户
  author: string;
}

// 象限
export enum TaskQuadrant {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

// 象限文本
export enum TaskQuadrantText {
  A = '重要且紧急',
  B = '重要不紧急',
  C = '不重要但紧急',
  D = '不重要不紧急'
}

export const TaskQuadrantList = [
  {
    value: TaskQuadrant.A,
    title: TaskQuadrantText.A
  },
  {
    value: TaskQuadrant.B,
    title: TaskQuadrantText.B
  },
  {
    value: TaskQuadrant.C,
    title: TaskQuadrantText.C
  },
  {
    value: TaskQuadrant.D,
    title: TaskQuadrantText.D
  }
];
