/*
 * @Author: Lancer
 * @Date:2020/1/19
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/1/19
 */
import { request } from "network/request";
import Qs from "qs";


//获取所有用户列表

export function getAllUserList() {
  return request({
    method: "get",
    url: "/getUser"
  });
}

//根据Id删除用户
export function deleteSingleUserById(data) {
  return request({
    method: "post",
    url:'/deleteUser',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}

//根据id获取个人用户信息
export function getSingleUserById(data) {
  return request({
    method: "post",
    url:'/getUserById',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}

//根据id修改用户信息
export function updateSingleUserById(data) {
  return request({
    method: "post",
    url:'/updateUserByAdmin',
    data,
    transformRequest: [function(data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
  });
}

//获取头像上传到服务器返回的url
export function submitAvator(data) {
  return request({
    method:'post',
    url:'/upload',
    data,
    headers:{"Content-Type": "multipart/form-data"}
  })
}

//获取用户分页
export function getRuleUsers(pageNum,pageSize) {
  return request({
    method:'get',
    url:'/user/page',
    params:{
      pageNum,
      pageSize
    },
  })
}

//根据用户名搜索用户
export function searchUserByName(userName) {
  return request({
    method:'get',
    url:'/searchUser',
    params:{
      userName
    },
  })
}