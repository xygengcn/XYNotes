import { Transition, defineComponent, ref, Suspense } from 'vue';
import { type RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
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
    const router = useRouter();
    router.beforeEach((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
      if (to.meta.index >= from.meta.index) {
        //设置动画名称
        transitionName.value = 'slide-right';
      } else if (to.query?.routerType === 'push') {
        transitionName.value = 'slide-left';
      }
    });

    router.afterEach(() => {
      setTimeout(() => {
        transitionName.value = '';
      }, 300);
    });

    return () => (
      <router-view
        name={props.name}
        v-slots={{
          default: ({ Component }) => (
            <Transition name={transitionName.value}>
              <Suspense>
                <Component></Component>
              </Suspense>
            </Transition>
          )
        }}
      ></router-view>
    );
  }
});

export default AppView;
