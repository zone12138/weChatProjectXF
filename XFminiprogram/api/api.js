/*
 * @Description: 
 * @Author: xcr
 */
const base_url = "http://172.16.1.37:8080/app"

const api = {
  // 登录
  login: base_url + "/Main",
  // 获取厂站信息
  factoryInfo: base_url + "/rest/stationBasicInfoResource/findStationBasicInfoByParams",
  
  // 首页今日生产信息
  productionInfo: base_url + "/rest/overviewResource/findSumFlowByStation",
  // 首页碳源投加情况echarts图
  carbonSource: base_url + "/rest/carbonsourceDosingRecordAction/findSumCarbonSourceByWeek",
  // 首页进出水水质信息
  inOrOutWaterQuality: base_url + "/rest/overviewResource/findWaterMonitorCaseByStation",
  // 首页预警信息情况echarts图
  warnInfo: base_url + "/rest/warningManagementResource/findWarningByStation",
  // 首页今日垃圾echarts图
  rubbishToday: base_url + "/rest/materialManagement/findDayEnterLitterRecordByWeek",
  // 首页区域垃圾echarts图
  rubbishArea: base_url + "/rest/materialManagement/findAreaNameEnterLitterRecordByTime",
  // 首页类型垃圾echarts图
  rubbishType: base_url + "/rest/materialManagement/findLitterTypeEnterLitterRecordByTime",

  // 生产模块预警记录
  warnRecord: base_url + "/rest/reportManagementResource/findWarningByParams",
  // 生产模块保存预警记录
  saveWarnRecord: base_url + "/rest/reportManagementResource/saveWarning",
  // 生产模块碳源投加记录
  carbonRecord: base_url + "/rest/carbonsourceDosingRecordAction/findStationSumCarbonSourceByDate",
  // 生产模块生产报表
  productionReport: base_url + "/rest/statementResource/findAppletProduceStatement",
  // 生产模块水质报表
  waterReport: base_url + "/rest/statementResource/findAppletWaterStatement",

  // 工艺模块 根据厂站编号获取工艺
  technologyList: base_url + "/rest/systemConfigurationResource/findTechnologyByStationNum",
  // 工艺模块 根据厂站编号和工艺编号获取数据列表
  technologyListParams: base_url + "/rest/scadaMonitoringResource/findStationRealTimeByParams",
  // 工艺模块 根据厂站编号和工艺编号获取设备数据列表
  equipmentList: base_url + '/rest/stationBasicInfoResource/findEquipmentCase',
  // 工艺模块 根据厂站编号和工艺编号和设备编号获取设备详情
  equipmentDetail: base_url + '/rest/stationBasicInfoResource/findEquipment',
  // 工艺模块 上报
  reported: base_url + '/rest/reportManagementResource/saveOrUpdateFaultReport',

  // 上报图片地址
  uploadImageUrl: base_url + '/rest/reportManagementResource/saveOrUpdateFaultReportPic'
  
}
export {
  api
}