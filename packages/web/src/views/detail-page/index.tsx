import NoteEditor from '@/components/note-editor';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IDetailPageProps {}

/**
 * 桌面端单独yes
 */

@Component
export default class DetailPage extends VueComponent<IDetailPageProps> {
  public render(): VNode {
    return (
      <div class="detail">
        <NoteEditor nid={this.$route.query?.nid as string}></NoteEditor>
      </div>
    );
  }
}
