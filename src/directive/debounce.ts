import { debounce } from '@/utils/debounce-throttle';
import { VNode } from 'vue';

export default {
  install(Vue) {
    Vue.directive('debounce', {
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
