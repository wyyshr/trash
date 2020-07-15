import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { req1 } from "../../../network/request";


@Component
export default class MainMap extends Vue{
  @Prop() private show2!: boolean;
  private center = { lng: 121.638984, lat: 29.833698 };
  private zoom: number = 13;
  private markers: Array<any> = [];

  private created() {
    this.getDev();
  }

  // methods
  @Emit("showMap")
  private dblclick(e: any) {
    return true;
  }
  private async getDev() {
    let res = await req1({
      url: "/user/findDustbin"
    });
    let arr = JSON.parse(JSON.stringify(res));
    arr.forEach((v: any, i: number) => {
      let geo = {
        lat: v.latitude,
        lng: v.longitude
      };
      arr[i].geo = geo;
    });
    this.markers = arr;
  }

  protected render() {
    return (
      <div>
        <baidu-map
          class="map"
          center={ this.center }
          zoom={ this.zoom }
          style={ this.show2?'height:700px':'height:510px' }
          scroll-wheel-zoom="true"
          ondblclick={ this.dblclick }
        >
          {
            this.markers.forEach((v,i) => {
              <bm-marker position={ v.geo }></bm-marker>
            })
          }
        </baidu-map>
      </div>
    )
  }
}