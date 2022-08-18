import axios from 'axios'
import config from '../config'
const baseUrl = process.env.NODE_ENV == 'developnent' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
	constructor(baseUrl) {
		this.baseUrl = baseUrl

	}
	getInsideConfig() {
		const config = {
			baseUrl: this.baseUrl,
			Header: {}
		}
		return config
	}
	//拦截器
	Interceptor(intercept) {
		intercept.interceptors.request.use(function (config) {
			// 在发送请求之前做些什么
			return config;
		}, function (error) {
			// 对请求错误做些什么
			return Promise.reject(error);
		});

	}
	request(options) {
		const instance = axios.create()
		options = { ...this.getInsideConfig(), ...options }
		this.Interceptor(instance)
		return instance(options)
	}
}
export default new HttpRequest(baseUrl)
