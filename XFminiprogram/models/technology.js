/*
 * @Description: 
 * @Author: xcr
 */
import {
  api
} from '../api/api.js'
import {
  Request
}
  from '../utils/request'
class TechnologyModel extends Request {

  /**
   * @description: 获取厂站信息
   * @param {} 无
   * @return: 
   */
  getFactoryInfo() {
    return this.request({
      url: api.factoryInfo,
      data: {
      }
    })
  }

  /**
   * @description: 获取厂站工艺信息
   * @param {stationNum} 厂站编号
   * @return: 
   */
  getTechnologyList(stationNum) {
    return this.request({
      url: api.technologyList,
      data: {
        stationNum
      }
    })
  }

  /**
   * @description: 获取厂站下工艺的实时检测数据
   * @param {stationNum,technologyNum} 厂站编号，工艺编号
   * @return: 
   */
  getTechnologyListParams(stationNum, technologyNum) {
    return this.request({
      url: api.technologyListParams,
      data: {
        stationNum, 
        technologyNum
      }
    })
  }

  /**
   * @description: 获取该工艺下的设备列表
   * @param {stationNum,technologyNum} 厂站编号，工艺编号
   * @return: 
   */
  getEquipmentList(stationNum, technologyNum) {
    return this.request({
      url: api.equipmentList,
      data: {
        stationNum,
        technologyNum
      }
    })
  }

  /**
   * @description: 获取该工艺下的设备的详情
   * @param {stationNum, technologyNum, equipmentNum} 厂站编号，工艺编号，设备编号
   * @return: 
   */
  getEquipmentDetail(stationNum, technologyNum, equipmentNum) {
    return this.request({
      url: api.equipmentDetail,
      data: {
        stationNum, 
        technologyNum,
        equipmentNum
      }
    })
  }

  // 获取预警记录信息
  getWarnRecord(params){
    return this.request({
      url: api.warnRecord,
      data: {
        params
      }
    })
  }

  /**
   * @description: 上报问题
   * @param {earlywarningReason,reportName,reportNum,handleStats,technologyName,technologyNum,equipmentNum,equipmentName,stationNum,remarks,earlywarningDateStr,faultPic} 故障描述，上报人，上报人编号（id），处理状态（默认为1，未处理），工艺名称，工艺编号，设备编号，设备名称，厂站编号，备注，上报（预警）时间，查找图片的时间戳
   * @return: 
   */
  reported(earlywarningReason, reportName, reportNum, handleStats, technologyName, technologyNum, equipmentNum, equipmentName, stationNum, remarks, earlywarningDateStr, faultPic) {
    return this.request({
      url: api.reported,
      data: {
        earlywarningReason, 
        reportName, 
        reportNum, 
        handleStats, 
        technologyName, 
        technologyNum, 
        equipmentNum, 
        equipmentName, 
        stationNum, 
        remarks, 
        earlywarningDateStr,
        faultPic
      }
    })
  }
}
export {
  TechnologyModel
}