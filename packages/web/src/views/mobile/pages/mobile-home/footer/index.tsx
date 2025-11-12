import { showMobileHomeMoreDrawer } from '@/views/mobile/plugins/more';
import { Icon } from '@xynotes/components';
import { noteListCount } from '@xynotes/store/note';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import './index.scss';

export const MobileHomeFooter = defineComponent({
  name: 'MobileHomeFooter',
  setup() {
    const router = useRouter();

    /**
     * 更多
     */
    const handleClickMore = () => {
      showMobileHomeMoreDrawer({
        onSetting: () => {
          router.push('/m/setting');
        }
      });
    };
    return () => (
      <div class="mobile-home-footer">
        <div class="mobile-home-footer-content">
          <span>{noteListCount.value}个笔记</span>
          <span class="mobile-home-footer-content-more" onClick={handleClickMore}>
            <Icon type="mobile-more" size="2em"></Icon>
          </span>
        </div>
      </div>
    );
  }
});
