import axios from 'axios';
import qs from 'qs';
const instance = axios.create({
	baseURL: 'https://api.xxhbuy.com/xxh-api/',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
	if(config.method=="post"){
		config.data = qs.stringify(config.data);
	}
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const POST = async (api:string ,params:object) => {
    return new Promise((resolve, reject) => {
        instance.post(api, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const fixTokenPost = async(api:string,params:object) => {
	return new Promise((resolve,reject)=>{
		params['access_token'] = '85544E4F2D81400BAF5F2D3FDCA1AD81';
		instance.post(api, params)
		.then(res => {
			resolve(res.data)
		})
		.catch(error => {
			reject(error)
		})
	});
}
export {POST};
export {fixTokenPost};

