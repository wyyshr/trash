import { Component, Vue, Emit } from 'vue-property-decorator';
import leftTab from '../leftTab/LeftTab'
// import * as imgUrl = require('../../../assets/img/user.png')

import './left.less'

@Component({
  components: {
    leftTab
  }
})
export default class Left extends Vue{
  private uname: string = ''

  @Emit('sendName')
  private created(): string {
    this.uname = localStorage.getItem('uname') || ''
    return this.uname
  }
  protected render() {
    return (
      <div>
        <div id="user_img">
          <div class="img">
            <img src={ require('../../../assets/img/user.png') } />
          </div>
          <span>管理员：{ this.uname }</span>
        </div>
          <leftTab />
      </div>
    )
  }
}