import { TaskItem, TaskList } from '@tiptap/extension-list';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    taskList: {
      /**
       * Toggle a task list
       * @example editor.commands.toggleTaskList()
       */
      toggleTaskList: () => ReturnType;
    };
  }
}

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

export { TaskItemExtension, TaskListExtension };
