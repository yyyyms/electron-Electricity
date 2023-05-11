import axios from "axios"
class HttpRequest {
    // 拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            // console.log('来了？');
            // console.log(store.state.token);

            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            // console.log('来了啊');
                // console.log(response);

            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(option){
        const instance = axios.create({
            // baseURL: 'http://106.55.171.176:8055/DTU',
            baseURL : 'http://106.55.171.176:7009/sendElectricity',
            timeout:10000,
            header:{

            }
        })
        this.interceptors(instance)
        return instance(option)
    }
}
export default new HttpRequest