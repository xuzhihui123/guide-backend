/*
 * @Author: Lancer
 * @Date:2020/4/8
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/4/8
 */

import { request } from "network/request";


//获取所有问题
export function getAllQuestion() {
  return request({
    method:'get',
    url:'/getQuestionDTOs'
  })
}