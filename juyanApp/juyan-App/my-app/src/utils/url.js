// 接口汇总
//服务器地址

/** 添用户管理**/
const serverUrl = 'http://47.100.237.163:8085/';//正式服务地址
// const serverUrl = 'http://106.15.187.138:8085/';//测试尚文忠服务地址
// const serverUrl = 'http://192.168.1.59:8085/';//本地刑崇阳地址
// const serverUrl = 'http://192.168.1.98:8099/';//本地汪瑞地址


const waaClientLogin = 'waa/clientLogin';//登录
const waaInsertClientUser = 'waa/insertClientUser';//注册

const reservedInformationInsertReservedInformation = 'reservedInformation/insertReservedInformation';//改版的表单提交


const curFindClientUserById  = 'cur/findClientUserById';//个人中心查询所有
const curUpdateClientUserPassword  = 'cur/updateClientUserPassword';//修改密码
const curClientloginOut  = 'cur/clientloginOut';//退出登陆
const curUpdateClientUser  = 'cur/updateClientUser';//修改头像
const curFindClientUserPictureById  = 'cur/findClientUserPictureById';//首页头像显示

const urLogin = 'ur/login';
const urLoginOut = 'ur/loginOut';

const waaWAfindAllAppBanner  = 'waa/WAfindAllAppBanner';//首页banner图
const waaWAfindAllNew  = 'waa/WAfindAllNew';//新品上架



const waaWAfindAllWeddingHotel  = 'waa/WAfindAllWeddingHotel';//宴会厅列表
const waaWAfindAllWeddingHotelName  = 'waa/WAfindAllWeddingHotelName';//查询所有宴会厅（不分页）


const waaWAfindAllPictureById  = 'waa/WAfindAllPictureById';//宴会厅详情
const waaWAfindWeddingHotelMenuById   = 'waa/WAfindWeddingHotelMenuById';//宴婚礼策划详情

const waaWAfindAllScheme = 'waa/WAfindAllScheme';//策划列表

const waaWAfindAllEmcee  = 'waa/WAfindAllEmcee';//司仪列表

const waaWAfindAllMakeup  = 'waa/WAfindAllMakeup';//跟妆
const waaWAfindAllCamera  = 'waa/WAfindAllCamera';//摄影
const waaWAfindAllPhotography  = 'waa/WAfindAllPhotography';//摄像

const waaWAfindAllWedding   = 'waa/WAfindAllWedding';//花艺

const waaWAfindAllWeddingPictures  = 'waa/WAfindAllWeddingPictures';//婚纱照

const waaWAfindAllFullDress    = 'waa/WAfindAllFullDress';//婚纱礼服

const waaWAfindAllCity  = 'waa/WAfindAllCity';//查询所有城市
const waaWAfindAllCounties  = 'waa/WAfindAllCounties';//查询所有城市县区



const waaInertWebAppData  = 'waa/inertWebAppData';//预约看厅表单提交

const curCheckWHC  = 'cur/CheckWHC';//查看是否收藏

const curInsertWHC  = 'cur/insertWHC';//添加收藏
const curDeletefindWHC  = 'cur/deletefindWHC';//取消收藏



const curFindAllWHCByUserId  = 'cur/findAllWHCByUserId';//查询收藏所有

const curDeletefind  = 'cur/deletefind';//点击删除收藏

const dydeDdd  = 'dyde/add';//增加类别列标中

const waaWAfindAllDictionaries = 'waa/WAfindAllDictionaries';//查询风格

const waaWAinsertQuestionnaire  = 'waa/WAinsertQuestionnaire';//问卷调查


const curWAinsertRecommend  = 'cur/WAinsertRecommend';//首页提交表单顾客推荐

const waaWAinsertRecommend  = 'waa/WAinsertRecommend';//首页提交表单顾客推荐//new

const curFindAllIsBoolean  = 'cur/findAllIsBoolean';//查看是否有新消息

const curFindAllPush  = 'cur/findAllPush';//查看所有消息记录
const cuFindById  = 'cur/findById';//查看消息详情
const curUpdatePushStatus  = 'cur/updatePushStatus';//修改消息状态
const curDeltePush  = 'cur/deltePush';//修改消息状态








export default{
    
    
    
    serverUrl: serverUrl,
    waaClientLogin: waaClientLogin,
    waaInsertClientUser: waaInsertClientUser,
    reservedInformationInsertReservedInformation:reservedInformationInsertReservedInformation,

    curFindClientUserById: curFindClientUserById,
    curUpdateClientUserPassword: curUpdateClientUserPassword,
    curClientloginOut: curClientloginOut,
    curUpdateClientUser: curUpdateClientUser,
    
    

    urLogin: urLogin,
    urLoginOut: urLoginOut,

    waaWAfindAllAppBanner: waaWAfindAllAppBanner,

    waaWAfindAllNew:waaWAfindAllNew,

    waaWAfindAllWeddingHotel: waaWAfindAllWeddingHotel,
    waaWAfindAllPictureById: waaWAfindAllPictureById,
    waaWAfindWeddingHotelMenuById: waaWAfindWeddingHotelMenuById,
    waaWAfindAllScheme: waaWAfindAllScheme,

    waaWAfindAllEmcee: waaWAfindAllEmcee,
    waaWAfindAllMakeup: waaWAfindAllMakeup, 
    waaWAfindAllCamera: waaWAfindAllCamera, 
    waaWAfindAllPhotography: waaWAfindAllPhotography,
    waaWAfindAllWedding: waaWAfindAllWedding, 
    waaWAfindAllFullDress: waaWAfindAllFullDress, 
    waaWAfindAllWeddingPictures: waaWAfindAllWeddingPictures, 
    waaWAfindAllCity: waaWAfindAllCity, 
    waaWAfindAllCounties : waaWAfindAllCounties,
    
    waaInertWebAppData: waaInertWebAppData,
    
    curCheckWHC: curCheckWHC,
    
    curInsertWHC: curInsertWHC, 
    curDeletefindWHC: curDeletefindWHC, 
    
    
    curFindAllWHCByUserId: curFindAllWHCByUserId, 
    curDeletefind: curDeletefind, 
    
    dydeDdd:dydeDdd,

    waaWAfindAllDictionaries:waaWAfindAllDictionaries,
    
    curFindClientUserPictureById:curFindClientUserPictureById,
    waaWAfindAllWeddingHotelName:waaWAfindAllWeddingHotelName,

    waaWAinsertQuestionnaire:waaWAinsertQuestionnaire,

    curWAinsertRecommend : curWAinsertRecommend,
    waaWAinsertRecommend:waaWAinsertRecommend,
    curFindAllIsBoolean:curFindAllIsBoolean,
    curFindAllPush:curFindAllPush,
    cuFindById:cuFindById,
    curUpdatePushStatus:curUpdatePushStatus,

    curDeltePush:curDeltePush,
    
}
