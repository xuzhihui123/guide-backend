/*
 * @Author: Lancer
 * @Date:2020/4/8
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/4/8
 */


import { request } from "network/request";


//获取所有完成的订单信息
export function getAllAlreadyOrders() {
  return request({
    method: "get",
    url: "/getAllAlreadyOrders"
  });
}


//获取所有订单分页
export function getOrdersPain(pageNum,pageSize) {
  return request({
    method: "get",
    url: "/order/page",
    params:{
      pageNum,
      pageSize
    }
  });
}


//根据订单 id 获取订单完整信息
export function getOrderById(orderId) {
   return request({
     method:'get',
     url:'/getOrderById',
     params:{
       orderId
     }
   })
}