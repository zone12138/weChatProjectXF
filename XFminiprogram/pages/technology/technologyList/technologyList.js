// pages/technology/technologyList/technologyList.js
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
    // 工艺检测数据
    technologyListParams:[],
    // 工艺设备情况数据
    equipmentList:[],
    // tab的index
    currentTab:0,
    // tab下方滚动部分的高度
    swiperHeight: 'calc(100% - 180rpx)',
    // 厂站编号
    stationNum: null,
    // 工艺编号
    technologyNum: null,
    // 工艺名称
    technologyName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stationNum: options.stationNum,
      technologyNum: options.technologyNum,
      technologyName: options.technologyName
    })
    this.getTechnologyListParams();
    this.getEquipmentList();
  },

  // 获取工艺实时检测数据
  getTechnologyListParams(){
    technologyModel.getTechnologyListParams(this.data.stationNum, this.data.technologyNum).then(res => {
      this.setData({
        technologyListParams: res.data
      })
    })
  },

  // 获取工艺设备情况
  getEquipmentList(e){
    technologyModel.getEquipmentList(this.data.stationNum, this.data.technologyNum).then(res => {
      this.sortEquipmentList(res.data)
    })
  },

  // 整理设备数据(添加设备状态图片地址)
  sortEquipmentList(data){
    data.forEach(function(item){
      if (item.case == '运行'){
        item.imageUrl = '../../../asset/imgs/technology/operation.png';
      }else if (item.case == '故障'){
        item.imageUrl = '../../../asset/imgs/technology/breakdownRed.png';
      }else if (item.case == '待机'){
        item.imageUrl = '../../../asset/imgs/technology/standBy.png';
      }
    });
    this.setData({
      equipmentList: data
    });
  },

  // 滑动
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  // 点击tab
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // 查看设备详情
  showDetail(e){
    wx.navigateTo({
      url: '/pages/technology/equipmentDetail/equipmentDetail?equipmentNum=' + e.currentTarget.dataset.eqnum + '&technologyNum=' + this.data.technologyNum + '&stationNum=' + this.data.stationNum,
    })
  },

  // 上报
  bindReported(){
    wx.navigateTo({
      url: '/pages/technology/reported/reported?technologyNum=' + this.data.technologyNum + '&stationNum=' + this.data.stationNum + '&technologyName=' + this.data.technologyName,
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