import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

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
