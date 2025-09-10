import { debounce } from '@xynotes/utils';
import { type App } from 'vue';

export default function VueDebounce(app: App) {
  app.directive('debounce', {
    mounted: (el, binding, _vnode) => {
      el.debounceFn = debounce(binding.value);
      el.addEventListener('click', el.debounceFn);
    },
    beforeUnmount(el) {
      el.debounceFn && el.removeEventListener('click', el.debounceFn);
    }
  });
}
