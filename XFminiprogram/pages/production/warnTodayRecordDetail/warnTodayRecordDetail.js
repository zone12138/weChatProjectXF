// pages/production/warnTodayRecordDetail/warnTodayRecordDetail.js
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
    // 预警详情数据
    warnRecordData:{},
    // 预警信息 id
    warnId: null,
    // 预警信息 处理方案
    warnScheme: '',
    // 预警信息 处理人
    warnPerson: '',
    // 预警信息 处理内容
    warnRemark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      warnId: options.id
    });
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

  // 绑定输入的处理方案
  bindWarnScheme(e) {
    this.setData({
      warnScheme: e.detail.value
    })
  },

  // 绑定输入的处理人
  bindWarnPerson(e){
    this.setData({
      warnPerson: e.detail.value
    })
  },

  // 绑定输入的处理内容
  bindWarnRemark(e) {
    this.setData({
      warnRemark: e.detail.value
    })
  },

  // 提交
  submit(){
    const time = util.dateFormatter("yyyy-MM-dd hh:mm:ss");
    let userInfo = getApp().globalData.userInfo;
    productionModel.saveWarnRecord(this.data.warnId, this.data.warnScheme, this.data.warnRemark, userInfo.userId, userInfo.userName, time, 0, this.data.warnRecordData.tag).then(res => {
      if (res.code == 200){
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          success(){
            setTimeout(function(){
              wx.navigateBack({})
            },1500)
          }
        })
        
      }else{
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
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