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

class DeviceModels extends Request {
    /**
     * @description: 查询工艺名称
     * @param {type} 
     * @return: 
     */
    getProcessInfo(data) {
        return this.request({
            url: api.processName,
            data
        })
    }

    /**
     * @description: 查询工艺监测数据
     * @param {type} 
     * @return: 
     */
    getMonitorProcess(data) {
        return this.request({
            url: api.monitorProcess,
            data
        })
    }

    /**
     * @description: 查询工艺设备情况
     * @param {type} 
     * @return: 
     */
    getProcessDeviceInfo(data) {
        return this.request({
            url: api.processDeviceInfo,
            data
        })
    }

    /**
     * @description: 提交上报记录
     * @param {type} 
     * @return: 
     */
    saveProcesInfo(data) {
        return this.request({
            url: api.saveProcesInfo,
            data
        })
    }

    /**
     * @description: 设备详情
     * @param {type} 
     * @return: 
     */
    getDeviceDetailInfo(data) {
        return this.request({
            url: api.deviceDetailInfo,
            data
        })
    }

    /**
     * @description: 设备预警记录
     * @param {type} 
     * @return: 
     */
    getDeviceWaringRecord(data) {
        return this.request({
            url: api.deviceWaringRecord,
            data
        })
    }
}

export {
    DeviceModels
}