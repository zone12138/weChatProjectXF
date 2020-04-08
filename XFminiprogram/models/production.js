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
class ProductionModel extends Request {

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
   * @description: 获取预警信息
   * @param {date} params:{日期}
   * @return: 
   */
  getWarnRecord(params) {
    return this.request({
      url: api.warnRecord,
      data: {
        params
      }
    })
  }

  /**
   * @description: 保存预警信息
   * @param {id,handleProgramme,remarks,handleRecorderNum,handleRecorderName,handleDateStr,handleStats,tag} 预警id，处理方案，处理内容，处理人id，处理人名称，处理时间，状态，说明是哪张数据库表
   * @return: 
   */
  saveWarnRecord(id, handleProgramme, remarks, handleRecorderNum, handleRecorderName, handleDateStr, handleStats, tag){
    return this.request({
      url: api.saveWarnRecord,
      data: {
        id, 
        handleProgramme, 
        remarks, 
        handleRecorderNum, 
        handleRecorderName, 
        handleDateStr, 
        handleStats, 
        tag
      }
    })
  }


  /**
   * @description: 获取碳源投加记录
   * @param {date} 日期
   * @return: 
   */
  getCarbonRecord(recordDate) {
    return this.request({
      url: api.carbonRecord,
      data: {
        recordDate,
      }
    })
  }

  /**
   * @description: 获取生产报表数据
   * @param {date,stationNum} 日期，厂站编号(数组)
   * @return: 
   */
  getProductionReport(recordDate, stationNum) {
    return this.request({
      url: api.productionReport,
      data: {
        recordDate,
        stationNum
      }
    })
  }

  /**
   * @description: 获取水质报表数据
   * @param {date,stationNum} 日期，厂站编号
   * @return: 
   */
  getWaterReport(recordDate, stationNum) {
    return this.request({
      url: api.waterReport,
      data: {
        recordDate,
        stationNum
      }
    })
  }
}
export {
  ProductionModel
}