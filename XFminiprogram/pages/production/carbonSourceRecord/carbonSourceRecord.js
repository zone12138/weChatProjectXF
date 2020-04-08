// pages/production/carbonSourceRecord/carbonSourceRecord.js
// 引入公共函数
import * as util from '../../../utils/util.js'

// 引入封装好的函数
import {
  ProductionModel
} from '../../../models/production.js'

const productionModel = new ProductionModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日期
    date: util.dateFormatter("yyyy-MM-dd"),
    // 清空日期输入框的小叉是否显示
    isClearShow: true,
    // 碳源投加记录数据
    carbonRecordData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarbonRecord();
  },

  // 获取碳源投加记录数据
  getCarbonRecord(){
    productionModel.getCarbonRecord(this.data.date).then(res => {
      this.setData({
        carbonRecordData: res.data
      })
    })
  },

  // 选择时间
  selectDateTime() {

  },

  // 更换选择时间
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
      isClearShow: true
    });
    this.getCarbonRecord();
  },

  // 清楚选择的时间
  clearTap() {
    this.setData({
      date: "",
      isClearShow: false
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