// pages/technology/equipmentList/equipmentList.js
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
    // 厂站编号
    stationNum: null,
    // 工艺编号
    technologyNum: null,
    // 设备编号
    equipmentNum: null,
    // 设备名称
    equipmentName: null,
    // 设备列表
    equipmentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      stationNum: options.stationNum,
      technologyNum: options.technologyNum,
      equipmentName: options.equipmentName,
      equipmentNum: options.equipmentNum
    })
    this.getEquipmentList();
  },

  // 获取厂站工艺下的设备
  getEquipmentList(){
    technologyModel.getEquipmentList(this.data.stationNum,this.data.technologyNum).then(res => {
      this.setData({
        equipmentList: res.data
      })
      if (res.data.length>0){
        if (this.data.equipmentNum == "null" && this.data.equipmentName == "null") {
          this.setData({
            equipmentNum: res.data[0].equipmentNum,
            equipmentName: res.data[0].equipmentName
          })
        }
      }
    })
  },

  // 点击选择设备
  selectEquipment(e){
    this.setData({
      equipmentNum: e.currentTarget.dataset.num,
      equipmentName: e.currentTarget.dataset.name
    })
  },

  // 提交
  submit(){
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      equipmentNum: this.data.equipmentNum,
      equipmentName: this.data.equipmentName
    });
    wx.navigateBack({
      delta: 1
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