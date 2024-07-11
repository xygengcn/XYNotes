import AppView from '@/components/router-view';
import { defineComponent, onBeforeMount } from 'vue';
import './index.scss';

const Mobile = defineComponent({
  name: 'Mobile',
  setup() {
    onBeforeMount(()=>{
      // 禁止放大
      document.addEventListener("gesturechange",(e)=>{
        e.preventDefault()
      })
    })
    return () => (
      <div class="mobile">
        <AppView />
      </div>
    );
  }
});

export default Mobile;
