/*
 * @Author: Lancer
 * @Date:2019/12/12
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/12
 */
import  axios from 'axios'
export function request(config) {
  const instance  = axios.create({
     baseURL:'http://172.20.10.4:8081'
  })
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    return Promise.reject(err)
  })

  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    return Promise.reject(err)
  })
  return instance(config)
}