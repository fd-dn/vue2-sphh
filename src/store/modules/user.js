import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
//引入的路由信息
import { resetRouter , asythRouter ,constantRoutes , anyRouter} from '@/router'

import router from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    buttons:[],
    roles:[],
    //处理后的异步路由
    asythRouter:[],
    //完整的路由权限
    routerAll:[]
  }
}

const state = getDefaultState()

const mutations = {
  //重置token
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //储存token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DATE:(state,data) => {
    state.name = data.name;
    state.avatar = data.avatar;
    //菜单
    state.routes = data.routes;
    //按钮
    state.buttons = data.buttons;
    //角色
    state.roles = data.roles;
    //处理后的异步路由
  },
  SET_COMPUTROUTER(state,routers){
    state.asythRouter = routers;
    state.routerAll = state.asythRouter.concat(constantRoutes,anyRouter);
    //给路由添加新的路由
    router.addRoutes(state.routerAll);
  }
}
function  comput(asythRouter,routes){
  return  asythRouter.filter(item=>{
    if(routes.indexOf(item.name) != -1){
      //递归：判断是否还有2，3，4，5级路由
       if(item.children && item.children.length){
          item.children = comput(item.children,routes)
       }
       return true
    }
  })

}
const actions = {
  // 存储token信息
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let reust =   await login({ username: username.trim(), password: password })
    if(reust.code == 20000 || reust.code == 200){
      commit('SET_TOKEN', reust.data.token);
      setToken(reust.data.token);
      return 'OK';
    }else{
      return new Promise.reject(Error('faile'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 存储用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {

        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_DATE',data);
        commit('SET_COMPUTROUTER',comput(asythRouter,data.routes));
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

