import { useEditor } from '@editor/editor';
import { Level } from '@tiptap/extension-heading';
import { is } from '@xynotes/utils';
import { defineComponent, Ref, ref } from 'vue';
import { useTippy } from 'vue-tippy';
import './index.scss';

export const useBubbleMenuHeading = (el: Ref<HTMLElement>) => {
  const bubbleMenuHeading = ref({ active: false, level: 0 });

  const { editor } = useEditor();

  const BubbleMenuHeading = defineComponent({
    name: 'BubbleMenuHeading',
    setup(props) {
      return () => (
        <div class="bubble-menu-heading">
          {[1, 2, 3, 4, 5, 6].map((item: Level) => {
            return (
              <span
                class={{
                  heading: true,
                  active: bubbleMenuHeading.value.active && bubbleMenuHeading.value.level === item
                }}
                onClick={() => {
                  editor.value.chain().focus().toggleHeading({ level: item }).run();
                }}
              >
                H{item}
              </span>
            );
          })}
        </div>
      );
    }
  });
  useTippy(el, {
    content: BubbleMenuHeading,
    theme: 'light',
    appendTo: document.body,
    interactive: true,
    trigger: is.desktop() ? 'mouseenter focus' : 'click',
    placement: 'top',
    hideOnClick: 'toggle',
    duration: 0,
    getReferenceClientRect: null,
    plugins: [
      {
        name: 'BubbleMenuHeadingState',
        fn: () => {
          return {
            onShow() {
              bubbleMenuHeading.value = {
                active: editor.value?.isActive('heading') || false,
                level: editor.value?.getAttributes('heading').level || 0
              };
            }
          };
        }
      }
    ]
  });

  const update = () => {
    if (!editor.value) {
      return;
    }
    bubbleMenuHeading.value = {
      active: editor.value?.isActive('heading') || false,
      level: editor.value?.getAttributes('heading').level || 0
    };
  };

  return { update };
};
