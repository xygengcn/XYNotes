import { Transition, defineComponent, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import './index.scss';

const AppView = defineComponent({
  name: 'AppView',
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const transitionName = ref('');
    const route = useRoute();
    watch(route, (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        transitionName.value = 'slide-left';
      } else {
        transitionName.value = 'slide-right';
      }
    });
    return () => (
      <Transition name={transitionName.value}>
        <router-view name={props.name}></router-view>
      </Transition>
    );
  }
});

export default AppView;
