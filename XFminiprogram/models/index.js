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
class IndexModel extends Request {

  /**
   * @description: 获取生产信息
   * @param {date} 日期
   * @return: 
   */
  getProductionInfo(listenDate) {
    return this.request({
      url: api.productionInfo,
        data: {
          listenDate
        }
    })
  }

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
   * @description: 获取进出水水质信息
   * @param {date,stationNum,procedureNum} 日期，厂站编号，进出水类型（1：进水，2：出水）
   * @return: 
   */
  getWaterQuality(recordDate, stationNum, procedureNum) {
    return this.request({
      url: api.inOrOutWaterQuality,
      data:{
        recordDate,
        stationNum,
        procedureNum
      }
    })
  }


  /**
   * @description: 获取碳源投加情况
   * @param {date} 日期
   * @return: 
   */
  getCarbonSource(recordDate) {
    return this.request({
      url: api.carbonSource,
      data: {
        recordDate,
      }
    })
  }

  /**
   * @description: 获取预警信息数据
   * @param {type} 
   * @return: 
   */
  getWarnInfo(year) {
    return this.request({
      url: api.warnInfo,
      data: {
        year
      }
    })
  }

  /**
   * @description: 获取今日垃圾总量
   * @param {date} 日期
   * @return: 
   */
  getRubbishToday(day) {
    return this.request({
      url: api.rubbishToday,
      data: {
          day
      }
    })
  }

  /**
   * @description: 获取区域生活垃圾数据
   * @param {date} 日期
   * @return: 
   */
  getRubbishArea(date) {
    return this.request({
      url: api.rubbishArea,
      data: {
        date
      }
    })
  }

  /**
   * @description: 获取类型垃圾数据
   * @param {date} 日期
   * @return: 
   */
  getRubbishType(date) {
    return this.request({
      url: api.rubbishType,
      data: {
        date
      }
    })
  }
}
export {
    IndexModel
}