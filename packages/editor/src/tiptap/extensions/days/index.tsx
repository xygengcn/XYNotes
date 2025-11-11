import { Node as NodePm } from '@tiptap/pm/model';
import { Node, nodeViewProps, NodeViewWrapper, VueNodeViewRenderer } from '@tiptap/vue-3';
import { calculateDaysBetween, timeFormat } from '@xynotes/utils';
import { computed, defineComponent } from 'vue';
import { getRandomColor } from './colorUtils';
import showDaysDialog, { showDaysDrawer } from './edit';
import './index.scss';
import { IDaysOptions } from './type';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    days: {
      createDaysNodeDrawer: () => ReturnType;
      createDaysNodeDialog: () => ReturnType;
      insertDays: (options: IDaysOptions) => ReturnType;
    };
  }
}

const Component = defineComponent({
  name: 'DaysComponent',
  props: nodeViewProps,
  setup(props) {
    const options = computed(() => props.node.attrs as IDaysOptions);
    const days = computed(() => {
      if (options.value.endTime) {
        const days = calculateDaysBetween(new Date(), new Date(options.value.endTime));
        if (days !== 0) {
          return Math.abs(days);
        }
      }
      return 0;
    });
    return () => (
      <NodeViewWrapper class="markdown-editor-days" draggable>
        <div class="markdown-editor-days-content">
          <div class="markdown-editor-days-content-title">{options.value.title}</div>
          <div class="markdown-editor-days-content-date">{timeFormat(options.value.endTime, 'yyyy-MM-dd')}</div>
        </div>
        <div
          class="markdown-editor-days-count"
          style={{ backgroundColor: options.value.countColor || getRandomColor() }}
        >
          <span class="count">{days.value}</span>
          <span class="text">天</span>
        </div>
      </NodeViewWrapper>
    );
  }
});

export default Node.create({
  name: 'days',
  group: 'block',
  draggable: true,
  atom: true,
  content: 'inline*',
  addAttributes() {
    return {
      title: {
        default: ''
      },
      endTime: {
        default: 0
      },
      type: {
        default: ''
      },
      countColor: {
        default: ''
      }
    };
  },
  addCommands() {
    return {
      createDaysNodeDrawer:
        () =>
        ({ editor }) => {
          showDaysDrawer((options) => {
            editor.chain().insertDays(options).run();
          });
          return true;
        },
      createDaysNodeDialog:
        () =>
        ({ editor }) => {
          showDaysDialog((options) => {
            editor.chain().insertDays(options).run();
          });
          return true;
        },
      insertDays:
        (options: IDaysOptions) =>
        ({ commands, state }) => {
          // @ts-ignore
          const node = state.selection?.node as NodePm;
          if (node?.type.name === 'days') {
            commands.insertContentAt(state.selection.to, {
              type: 'days',
              attrs: options
            });
            return true;
          }
          commands.insertContent({
            type: 'days',
            attrs: options
          });
          return true;
        }
    };
  },
  renderText({ node }) {
    let days = calculateDaysBetween(new Date(), new Date(node.attrs.endTime)) || 0;
    if (days !== 0) {
      days = Math.abs(days);
    }
    return node.attrs.title + ' ' + timeFormat(node.attrs.endTime, 'yyyy-MM-dd') + ' ' + days + '天';
  },

  renderHTML({ HTMLAttributes }) {
    const div = document.createElement('div');
    let days = calculateDaysBetween(new Date(), new Date(HTMLAttributes.endTime)) || 0;
    if (days !== 0) {
      days = Math.abs(days);
    }
    div.innerHTML = `<div class="markdown-editor-days">
        <div class="markdown-editor-days-content">
          <div class="markdown-editor-days-content-title">${HTMLAttributes.title}</div>
          <div class="markdown-editor-days-content-date">${timeFormat(HTMLAttributes.endTime, 'yyyy-MM-dd')}</div>
        </div>
        <div
          class="markdown-editor-days-count"
          style="background-color: ${HTMLAttributes.countColor}"
        >
          <span class="count">${days}</span>
          <span class="text">天</span>
        </div>
      </div>`;
    return div;
  },

  addNodeView() {
    return VueNodeViewRenderer(Component, {
      stopEvent(e) {
        return false;
      }
    });
  },
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage() {
    return {
      markdown: {
        serialize(state, node) {
          let days = calculateDaysBetween(new Date(), new Date(node.attrs.endTime)) || 0;
          if (days !== 0) {
            days = Math.abs(days);
          }
          state.text(
            '【' + node.attrs.title + '（' + timeFormat(node.attrs.endTime, 'yyyy-MM-dd') + '）' + days + '天' + '】'
          );
        },
        parse: {}
      }
    };
  }
});
