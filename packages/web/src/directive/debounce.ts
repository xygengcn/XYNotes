import { debounce } from '@/utils/debounce-throttle';
import { App } from 'vue';

export default function VueDebounce(app: App) {
  app.directive('debounce', {
    mounted: (el, binding, vnode) => {
      el.debounceFn = debounce(binding.value);
      el.addEventListener('click', el.debounceFn);
    },
    beforeUnmount(el) {
      el.debounceFn && el.removeEventListener('click', el.debounceFn);
    }
  });
}
