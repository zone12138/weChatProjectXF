/*
 * @Description: 
 * @Author: 陈月德
 */
import {
    api
} from '../api/api.js'
import {
    Request
}
from '../utils/request'
class TaskModels extends Request {

    /**
     * @description: 渗滤液报表得出的数据
     * @param {type} 
     * @return: 
     */
    findDataByProductionData(data) {
        return this.request({
            url: api.findDataByProductionData,
            data
        })
    }

    /**
     * @description: 未处理任务数量
     * @param {type} 
     * @return: 
     */
    unHandleTaskNum(data) {
        return this.request({
            url: api.unHandleTaskNum,
            data
        })
    }

    /**
     * @description: 能耗电表
     * @param {type} 
     * @return: 
     */
    findRecentlyData(data) {
        return this.request({
            url: api.findRecentlyData,
            data
        })
    }

    /**
     * @description: 水质化验参数配置
     * @param {type} 
     * @return: 
     */
    findNetProcessParamementConfig(data) {
        return this.request({
            url: api.findNetProcessParamementConfig,
            data
        })
    }


    /**
     * @description: 保存能耗记录
     * @param {type} 
     * @return: 
     */
    saveEnergyConsumeRecord(data) {
        return this.request({
            url: api.saveEnergyConsumeRecord,
            data
        })
    }

    /**
     * @description: 查询电表读数
     * @param {type} 
     * @return: 
     */
    getMeter(entryDate) {
        return this.request({
            url: api.findMeter,
            data: {
                entryDate
            }
        })
    }

    /**
     * @description: 查询耗电参数（有哪些电表）
     * @param {type} 
     * @return: 
     */
    getMeterParams() {
        return this.request({
            url: api.meterParams,
        })
    }

    /**
     * @description: 查询药耗药品
     * @param {type} 
     * @return: 
     */
    getDrguParams() {
        return this.request({
            url: api.drugParams
        })
    }

    /**
     * @description: 保存水质化验
     * @param {type} 
     * @return: 
     */
    saveAvgWaterQuality(data) {
        return this.request({
            url: api.saveAvgWaterQuality,
            data
        })
    }

    /**
     * @description: 查询水质化验 药品项
     * @param {type} 
     * @return: 
     */
    getWaterQualityParameter() {
        return this.request({
            url: api.waterQualityParameter
        })
    }

    /**
     * @description: 获取设备预警记录
     * @param {type} 
     * @return: 
     */
    getWaringRecordInfo(data) {
        return this.request({
            url: api.waringRecordInfo,
            data
        })
    }

    /**
     * @description: 获取预警记录详情
     * @param {type} 
     * @return: 
     */
    getWaringRecordDetail(data) {
        return this.request({
            url: api.waringRecordDetail,
            data
        })
    }


    /**
     * @description: 预警处理提交
     * @param {type} 
     * @return: 
     */
    submitWaring(data) {
        return this.request({
            url: api.postWaringInfo,
            data
        })
    }

    /**
     * @description: 查询生产数据参数以及配置
     * @param {type} 
     * @return: 
     */
    getLeachateInAndOutParams(data) {
        return this.request({
            url: api.leachateInAndOutParams,
            data
        })
    }

    /**
     * @description: 查询渗滤液数据
     * @param {type} 
     * @return: 
     */
    getLeachateInAndOutData(data) {
        return this.request({
            url: api.leachateInAndOutData,
            data
        })
    }
    /**
     * @description: 进出水报表数据新增接口
     * @param {type} 
     * @return: 
     */
    addInandOutData(data) {
        return this.request({
            url: api.addInandOutData,
            data
        })
    }

    /**
     * @description: 进出水报表数据修改接口
     * @param {type} 
     * @return: 
     */
    updateInAndData(data) {
        return this.request({
            url: api.updateInAndData,
            data
        })
    }

    /**
     * @description: 渗滤液进出水数据
     * @param {type} 
     * @return: 
     */
    getLeachateData(data) {
        return this.request({
            url: api.leachateData,
            data
        })
    }

    /**
     * @description: 查询运行数据参数
     * @param {type} 
     * @return: 
     */
    getWorkingParams() {
        return this.request({
            url: api.workingParams
        })
    }

    /**
     * @description: 查询运行数据
     * @param {type} 
     * @return: 
     */
    getWorkingData(data) {
        return this.request({
            url: api.workingData,
            data
        })
    }

    /**
     * @description: 运行报表数据新增接口
     * @param {type} 
     * @return: 
     */
    add(data) {
        return this.request({
            url: api.addWorkingData,
            data
        })
    }

    /**
     * @description: 运行报表数据修改接口
     * @param {type} 
     * @return: 
     */
    update(data) {
        return this.request({
            url: api.updataWoringData,
            data
        })
    }

    /**
     * @description: 查询今日电表读数
     * @param {type} 
     * @return: 
     */
    getTodayConsume(data) {
        return this.request({
            url: api.todayConsume,
            data
        })
    }

}
export {
    TaskModels
}