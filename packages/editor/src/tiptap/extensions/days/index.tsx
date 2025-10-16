import { mergeAttributes, Node } from '@tiptap/core';
import { nodeViewProps, NodeViewWrapper, VueNodeViewRenderer } from '@tiptap/vue-3';
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
      <NodeViewWrapper class="markdown-editor-days">
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
  group: 'inline',
  inline: true,
  draggable: true,
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
            editor
              .chain()
              .insertContent({
                type: 'days',
                attrs: options
              })
              .run();
          });
          return true;
        },
      createDaysNodeDialog:
        () =>
        ({ editor }) => {
          showDaysDialog((options) => {
            editor
              .chain()
              .insertContent({
                type: 'days',
                attrs: options
              })
              .run();
          });
          return true;
        },
      insertDays:
        (options: IDaysOptions) =>
        ({ commands }) => {
          commands.insertContent({
            type: 'days',
            attrs: options
          });
          return true;
        }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="days"]'
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'days' })];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  }
});
