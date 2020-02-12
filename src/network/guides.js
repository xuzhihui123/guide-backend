/*
 * @Author: Lancer
 * @Date:2020/2/11
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/2/11
 */


import { request } from "network/request";
import Qs from "qs";


//获取所有导游列表

export function getAllGuideList() {
  return request({
    method: "get",
    url: "/getGuide"
  });
}

//根据Id删除导游
export function deleteSingleGuideById(data) {
  return request({
    method: "post",
    url:'/deleteGuide',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}

//根据导游名搜索导游
export function searchGuideByName(guideName) {
  return request({
    method:'get',
    url:'/searchGuide',
    params:{
      guideName
    },
  })
}

//根据id获取导游信息
export function getSingleGuideById(data) {
  return request({
    method: "post",
    url:'/getGuideById',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}


//根据id编辑导游信息
export function updateSingleGuideById(data) {
  return request({
    method: "post",
    url:'/updateGuideByAdmin',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}


//获取导游分页
export function getRuleGuides(pageNum,pageSize) {
  return request({
    method:'get',
    url:'/guide/page',
    params:{
      pageNum,
      pageSize
    },
  })
}