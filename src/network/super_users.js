/*
 * @Author: Lancer
 * @Date:2019/12/14
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/14
 */

import  {request} from "network/request";
import Qs from 'qs'

//获取所有管理员

export function getAllSuperUsers() {
  return request(
    {
      method:'get',
      url:'/getAdmin'
    }
  )
}

//根据分页和每页条数来获取管理员
export function getRuleSuperUsers(pageNum,pageSize) {
  return request({
    method:'get',
    url:'/admin/page',
    params:{
      pageNum,
      pageSize
    }
  })
}

//删除管理员
export  function deleteAdminUsersById(id) {
  return request(
    {
      method:'get',
      url:'/deleteAdmin',
      params:{
        id
      }
    }
  )
}

//添加管理员
export function addAdminUser(data) {
  return request({
    method:'post',
    url:'/insertAdmin',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
}


//查询单个管理员
export function searchAdminUser(userName) {
  return request({
    method:'get',
    url:'/searchAdmin',
    params:{
      userName
    }
  })
}


//编辑管理员
export function editAdminUser(data) {
    return request({
      method:'post',
      url:'/updateAdmin',
      data,
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }],
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
    })
}