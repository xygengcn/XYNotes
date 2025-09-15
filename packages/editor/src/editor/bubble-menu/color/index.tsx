import { useEditor } from '@editor/editor';
import { is } from '@xynotes/utils';
import { defineComponent, Ref } from 'vue';
import { useTippy } from 'vue-tippy';
import './index.scss';

export const useBubbleMenuColor = (el: Ref<HTMLElement>) => {
  const { editor } = useEditor();

  const BubbleMenuColor = defineComponent({
    name: 'BubbleMenuColor',
    setup(props) {
      return () => (
        <div class="bubble-menu-color">
          <span
            class="bubble-menu-color-item"
            onClick={() => {
              editor.value.chain().focus().unsetColor().run();
            }}
          >
            <i style={{ backgroundColor: '#333' }}></i>
          </span>
          {[
            '#B3261E',
            '#F87116',
            '#F4B400',
            '#0F9D58',
            '#007B83',
            '#4285F4',
            '#9246CD',
            '#5F6368',
            '#68217A',
            '#0D7347'
          ].map((item: string) => {
            return (
              <span
                class="bubble-menu-color-item"
                onClick={() => {
                  editor.value.chain().focus().setColor(item).run();
                }}
              >
                <i style={{ backgroundColor: item }}></i>
              </span>
            );
          })}
        </div>
      );
    }
  });
  useTippy(el, {
    content: BubbleMenuColor,
    theme: 'light',
    interactive: true,
    trigger: is.desktop() ? 'mouseenter focus' : 'click',
    placement: 'top',
    hideOnClick: 'toggle',
    duration: 0,
    getReferenceClientRect: null
  });

  return {};
};
