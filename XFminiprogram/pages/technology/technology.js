// pages/technology/technology.js
// 引入封装好的函数
import {
  TechnologyModel
} from '../../models/technology.js'

const technologyModel = new TechnologyModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 厂站信息
    netArray: [],
    // 厂站切换tab
    currentTab: 0,
    // 厂站编号
    stationNum: '',
    // 厂站工艺
    technologyList:[],
    // 高度
    swiperHeight: 350
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFactoryInfo();
  },

  // swiperTab: function (e) {
  //   this.setData({
  //     currentTab: e.detail.current
  //   });
  //   this.setData({
  //     stationNum: this.data.netArray[this.data.currentTab].stationNum
  //   })
  // },

  // 点击厂站tab
  clickTab: function (e) {
    this.setData({
      stationNum: e.target.dataset.num
    })
    this.getTechnologyList();
  },

  // 获取厂站信息
  getFactoryInfo() {
    technologyModel.getFactoryInfo().then(res => {
      this.setData({
        netArray: res.data,
        stationNum: res.data[0].stationNum
      });
      this.getTechnologyList();
    })
  },

  // 获取厂站工艺信息
  getTechnologyList(){
    technologyModel.getTechnologyList(this.data.stationNum).then(res => {
      this.setData({
        technologyList: res.data
      })
    })
  },

  // 点击工艺进入实时详情页面
  changePage(e){
    // technologyModel.getTechnologyListParams(this.data.stationNum, e.currentTarget.dataset.id).then(res => {
      wx.navigateTo({
        url: '/pages/technology/technologyList/technologyList?technologyNum=' + e.currentTarget.dataset.id + '&stationNum=' + this.data.stationNum + '&technologyName=' + e.currentTarget.dataset.name ,
      })
    // })
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