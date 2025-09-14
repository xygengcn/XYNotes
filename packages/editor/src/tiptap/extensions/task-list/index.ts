import { TaskList, TaskItem } from '@tiptap/extension-list';

const TaskListExtension = TaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      itemTypeName: 'taskItem',
      HTMLAttributes: {
        class: 'markdown-editor-task'
      }
    };
  }
});

const TaskItemExtension = TaskItem.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-task-item'
      }
    };
  }
});

export { TaskListExtension, TaskItemExtension };
