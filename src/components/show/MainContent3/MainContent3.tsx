import { Component, Vue } from 'vue-property-decorator';
import chart3 from '../Chart3.vue'
import chart4 from '../Chart4.vue'
import chart5 from '../Chart5.vue'

import './MainContent3.less';

@Component({
  components: {
    chart3,
    chart4,
    chart5
  }
})
export default class MainContent3 extends Vue {

  protected render() {
    return (
      <div id="main_content3">
        <div class="left_chart">
          <chart3></chart3>
        </div>
        <div class="right_chart">
          <div class="top_chart">
            <chart4></chart4>
          </div>
          <div class="bottom_chart">
            <chart5></chart5>
          </div>
        </div>
      </div>
    )
  }
}