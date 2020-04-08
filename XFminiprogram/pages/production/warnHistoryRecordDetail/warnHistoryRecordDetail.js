// pages/production/warnHistoryRecordDetail/warnHistoryRecordDetail.js
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
    // 预警详情数据
    warnRecordData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const params = {
      id: options.id
    }
    this.getWarnRecord(params);
  },

  // 获取预警详情信息
  getWarnRecord(params) {
    productionModel.getWarnRecord(params).then(res => {
      this.setData({
        warnRecordData: res.data.list[0]
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