// pages/production/productionReport/productionReport.js
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
    // 日期(会随着日期改变而改变) -- 筛选框的时间
    date: util.dateFormatter("yyyy-MM-dd"),
    // 日期(只会在筛选时，点击确定后才改变) -- 顶部时间
    date1: util.dateFormatter("yyyy-MM-dd"),
    // 清空日期输入框的小叉是否显示
    isClearShow: false,
    // 类选择(弹窗动画)
    animate: 'showBox',
    // 筛选框显示
    yesorno: 'none',
    // 是否隐藏
    hidden: true,
    // 厂站名称数据
    netArray:[],
    // 厂站选中的值
    netValue: [],
    // 生产报表数据
    productionReportData:[],
    // 没有数据的图片
    noDataImage: '../../../asset/imgs/app/noData.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFactoryInfo();
    this.getProductionReport();
  },

  // 选择时间
  selectDateTime(){

  },

  // 更换选择时间
  bindDateChange(e){
    this.setData({
      date: e.detail.value,
      isClearShow: true
    })
  },

  // 清楚选择的时间
  clearTap(){
    this.setData({
      date: "",
      isClearShow: false
    })
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
      hidden: true,
      date1: this.data.date
    });
    this.getProductionReport();
  },

  // 获取厂站信息
  getFactoryInfo(){
    productionModel.getFactoryInfo().then(res => {
      this.sortFactoryInfo(res.data);
    })
  },

  // 整理厂站信息
  sortFactoryInfo(data){
    const array = this.data.netArray;
    for (var i = 0;i<data.length;i++){
      array.push({
        name: data[i].stationName,
        value: data[i].stationNum
      })
    }
    this.setData({
      netArray: array,
      netValue: ["全部"]
    })
  },

  getProductionReport(){
    let data = this.data.netValue;
    if (data.indexOf("全部") != -1){
      data = [];
    }
    productionModel.getProductionReport(this.data.date1, data).then(res => {
      this.setData({
        productionReportData: res.data
      })
    })
  },

  // 切换厂站
  changeNet(e){
    let data = [],index;
    // 逻辑判断
    if (e.currentTarget.dataset.num == "全部"){
      data = ["全部"];
    }else{
      data = this.data.netValue;
      if (data.indexOf("全部") != -1){
        data = [];
      }
      if (data.indexOf(e.currentTarget.dataset.num) != -1){
        index = data.indexOf(e.currentTarget.dataset.num);
        data.splice(index,1);
      }else{
        data.push(e.currentTarget.dataset.num);
      }
      if (data.length == 0){
        data.push("全部")
      }
    }
    this.setData({
      netValue: data
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