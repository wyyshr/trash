import axios,{AxiosResponse} from 'axios'
export function req1(config: any) {
  const instance1 = axios.create({
    // baseURL: 'http://30r97104b2.qicp.vip/',
    baseURL: 'http://3142n3t523.zicp.vip/',
  })
  // 请求拦截，一般用于页面添加请求时加载动画
  instance1.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  // 响应拦截，一般用于过滤出真正需要的信息
  instance1.interceptors.response.use((res: AxiosResponse) => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance1(config)
}