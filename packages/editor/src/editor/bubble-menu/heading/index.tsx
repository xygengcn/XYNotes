import { useEditor } from '@editor/editor';
import { Level } from '@tiptap/extension-heading';
import { defineComponent, onActivated, onMounted, onUpdated, Ref, ref, watch } from 'vue';
import './index.scss';
import { useTippy } from 'vue-tippy';
import { is } from '@xynotes/utils';

export const useHeadingBubbleMenu = (el: Ref<HTMLElement>) => {
  const bubbleMenuHeading = ref({ active: false, level: 0 });

  const { editor } = useEditor();

  const HeadingBubbleMenu = defineComponent({
    name: 'HeadingBubbleMenu',
    setup(props) {
      return () => (
        <div class="heading-bubble-menu">
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
    content: HeadingBubbleMenu,
    theme: 'light',
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
