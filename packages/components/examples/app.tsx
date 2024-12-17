import { defineComponent } from 'vue';
import './app.scss';
import Loading from '@/components/loading';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="app">
        <h1>Vue3公共组件库</h1>
        <table border="1">
          <tr>
            <th width="100px">组件</th>
            <th>样式</th>
          </tr>
          <tr>
            <td width="100px">加载</td>
            <td>
              <Loading></Loading>
            </td>
          </tr>
          <tr>
            <td width="100px">加载(文字)</td>
            <td>
              <Loading text="正在加载中"></Loading>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});
