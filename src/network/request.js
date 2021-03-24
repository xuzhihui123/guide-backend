/*
 * @Author: Lancer
 * @Date:2019/12/12
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/12
 */
import axios from 'axios'
export function request (config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
  })
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return Promise.reject(err)
  })
  return instance(config)
}
