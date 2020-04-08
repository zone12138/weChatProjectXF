// pages/production/warnTodayRecord/warnTodayRecord.js
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
    // 预警数据
    warnRecordData:[],
    // 没有数据的图片
    noDataImage: '../../../asset/imgs/app/noData.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getWarnRecord();
  },

  // 获取预警记录数据
  getWarnRecord(){
    let params = {
      earlywarningDate: this.data.date
      // earlywarningDate: "2020-01-08"
    }
    productionModel.getWarnRecord(params).then(res => {
      this.setData({
        warnRecordData: res.data.list
        // warnRecordData: []
      })
    })
  },

  // 点击项，根据项的状态进入不同的详情页
  changePage(e){
    const id = e.currentTarget.dataset.id;
    const status = e.currentTarget.dataset.status;
    if (status == 0){
      wx.navigateTo({
        url: '/pages/production/warnHistoryRecordDetail/warnHistoryRecordDetail?id='+id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/production/warnTodayRecordDetail/warnTodayRecordDetail?id=' + id,
      })
    }
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
    this.getWarnRecord();
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