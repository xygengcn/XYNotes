import { debounce } from '@/utils/debounce-throttle';
import Vue, { VNode } from 'vue';

export default {
  install(vue: typeof Vue) {
    vue.directive('debounce', {
      bind: (el: Element, binding, vnode: VNode) => {
        const fn = debounce(binding.value);
        el.addEventListener('click', fn);
        vnode.context.$once('hook:beforeDestroy', () => {
          el.removeEventListener('click', fn);
        });
      },
    });
  },
};
