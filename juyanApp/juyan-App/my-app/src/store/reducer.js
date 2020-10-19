import * as types from './types';

const reducer = (state,{type,payload}) => {
  switch (type){
    case types.ADD_ITEM:
      //处理业务逻辑的
      return Object.assign({},state,{list:state.list.concat(payload)});
    case types.UPDATE_LOADING:
      return Object.assign({},state,{bLoading:payload});
    case types.UPDATE_NAV:
      return Object.assign({},state,{bNav:payload});
    case types.UPDATE_FOOT:
      return Object.assign({},state,{bFoot:payload});
    case types.UPDATE_HOME_DATA:
      return Object.assign({},state,{homeData:payload});
    case types.UPDATE_FOLLOW_DATA:
      return Object.assign({},state,{followData:payload});
    case types.CLEAR_FOLLOW_DATA:
      return Object.assign({},state,{followData:[]});
    case types.CLEAR_HOME_DATA:
      return Object.assign({},state,{homeData:[]});
    case types.UPDATE_USER:
      return Object.assign({},state,{user:payload});
    default:
      return state
  }
};

export default reducer;