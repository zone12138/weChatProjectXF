// pages/technology/equipmentDetail/equipmentDetail.js
// 引入公共函数
import * as util from '../../../utils/util.js'

// 引入封装好的函数
import {
  TechnologyModel
} from '../../../models/technology.js'

const technologyModel = new TechnologyModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部tab的index（用于切换激活状态）
    tabIndex: 0,
    // 设备详情
    equipmentDetail: {},
    // 日期(不会随着日期改变而改变)
    today: util.dateFormatter("yyyy-MM-dd"),
    // 日期(会随着日期改变而改变) -- 筛选框的时间
    date: util.dateFormatter("yyyy-MM-dd"),
    // 日期(会随着日期改变而改变) -- 顶部时间
    date1: util.dateFormatter("yyyy-MM-dd"),
    // 日期(只会在筛选时，点击确定后才改变) -- 筛选框的时间
    datePlus: util.dateFormatter("yyyy-MM-dd"),
    // 日期(只会在筛选时，点击确定后才改变) -- 顶部时间
    datePlus1: util.dateFormatter("yyyy-MM-dd"),
    // 清空日期输入框的小叉是否显示
    isClearShow: false,
    // 类选择(弹窗动画)
    animate: 'showBox',
    // 筛选框显示
    yesorno: 'none',
    // 是否隐藏
    hidden: true,
    // 快速选择时间tab默认值
    timeTab: null,
    // 预警信息数据
    warnRecord: [],
    // 厂站编号
    stationNum:null,
    // 工艺编号
    technologyNum: null,
    // 设备编号
    equipmentNum: null,
    // 用于判断是否第一次进入预警记录
    firstIntoWarn:true,

    // 没有数据的图片
    noDataImage: '../../../asset/imgs/app/noData.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stationNum: options.stationNum,
      technologyNum: options.technologyNum,
      equipmentNum: options.equipmentNum
    })
    this.getEquipmentDetail();
  },

  // 获取设备详情
  getEquipmentDetail(){
    technologyModel.getEquipmentDetail(this.data.stationNum, this.data.technologyNum, this.data.equipmentNum).then(res => {
      this.setData({
        equipmentDetail: res.data
      })
    })
  },

  // 点击底部的tab
  changeTab(e){
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
    if (this.data.firstIntoWarn && this.data.tabIndex == 1){
      this.getWarnRecord();
      this.setData({
        firstIntoWarn: false
      })
    }
  },

  // 显示筛选框
  showBox() {
    this.setData({
      yesorno: 'block',
      animate: 'showBox',
      hidden: false
    });
  },

  // 隐藏筛选框
  hiddenBox() {
    this.setData({
      animate: 'hiddenBox',
      hidden: true
    });
  },

  // 更换选择时间
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
      isClearShow: true,
      timeTab: null
    })
  },

  // 更换选择时间
  bindDateChangePlus(e){
    this.setData({
      date1: e.detail.value,
      isClearShow: true,
      timeTab: null
    })
  },

  // 切换快速选择天数按钮
  changeTimeTab(e){
    this.setData({
      timeTab: e.currentTarget.dataset.day
    });
    if (this.data.timeTab == 1){
      this.setData({
        date: util.dateFormatter("yyyy-MM-dd", new Date(new Date().getTime() - this.data.timeTab * 24 * 60 * 60 * 1000)),
        date1: util.dateFormatter("yyyy-MM-dd", new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000))
      })
    }else{
      this.setData({
        date: util.dateFormatter("yyyy-MM-dd", new Date(new Date().getTime() - (this.data.timeTab - 1) * 24 * 60 * 60 * 1000)),
        date1: util.dateFormatter("yyyy-MM-dd", new Date(new Date().getTime()))
      })
    }
    
  },

  // 点击确定按钮
  comfireTime(){
    var startTime = new Date(this.data.date).getTime();
    var endTime = new Date(this.data.date1).getTime();
    if (endTime < startTime){
      wx.showToast({
        title: '请规范输入时间！',
        icon: 'none'
      });
    }else{
      this.setData({
        datePlus: this.data.date,
        datePlus1: this.data.date1
      })
      this.hiddenBox();
      this.getWarnRecord();
    }
  },
  
  // 获取预警信息
  getWarnRecord(){
    var params = {
      stationNum: this.data.stationNum, 
      technologyNum: this.data.technologyNum, 
      equipmentNum: this.data.equipmentNum, 
      startDate: this.data.datePlus, 
      endDate: this.data.datePlus1
    }
    technologyModel.getWarnRecord(params).then(res => {
      this.setData({
        warnRecord: res.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})