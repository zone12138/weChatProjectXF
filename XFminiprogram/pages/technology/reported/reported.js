// pages/technology/reported/reported.js
import {
  api
} from '../../../api/api.js'

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
    // 厂站编号
    stationNum: null,
    // 工艺编号
    technologyNum: null,
    // 工艺名称
    technologyName: null,
    // 设备编号
    equipmentNum: null,
    // 设备编号
    equipmentName: null,
    // 备注
    remark: "",
    // 描述
    detail: "",
    //工艺下拉框
    processOptionList: [{
      processName: '暂无数据'
    }],
    //设备下拉框
    deviceOptionList: [{
      equipmentName: '暂无数据'
    }],
    processNum: "", //工艺编号
    processName: "请选择", //工艺名称
    imageState: 0, //图片显示
    showChoosePage: true, //是否显示工艺下拉框
    showDeviceChoosePage: true, //是否显示设备下拉框
    hasImg: true, //显示上传图片按钮
    tempFilePaths: [],
    submitParams: {}, //提交的参数
    deviceName: '请选择'
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
  },

  /**
   * @description: 打开设备名称下拉框
   * @param {type} 
   * @return: 
   */
  openDeviceSelect() {
    this.setData({
      showDeviceChoosePage: false
    })
  },

  /**
   * @description: 选择设备
   * @param {type} 
   * @return: 
   */
  selectEquipment() {
    wx.navigateTo({
      url: "/pages/technology/equipmentList/equipmentList?stationNum=" + this.data.stationNum + "&technologyNum=" + this.data.technologyNum + "&equipmentName=" + this.data.equipmentName + "&equipmentNum=" + this.data.equipmentNum,
    })
  },

  /**
   * @description: 获取故障描述
   * @param {type} 
   * @return: 
   */

  getFaultDescription(e) {
    this.setData({
      detail: e.detail.value
    })
    // this.submitParams.reason = e.detail.value
  },

  /**
   * @description: 获取备注
   * @param {type} 
   * @return: 
   */
  getremark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * @description: 选择图片
   * @param {type} 
   * @return: 
   */
  choosePhoto(e) {
    if (this.data.tempFilePaths.length >= 3) {
      wx.showModal({
        title: '最多选择3张图片',
        content: '删除后再尝试选择',
        showCancel: false
      })
      return
    }
    wx.chooseImage({
      count: 3,
      success: res => {
        this.data.tempFilePaths = res.tempFilePaths.concat(this.data.tempFilePaths);
        this.setData({
          tempFilePaths: this.data.tempFilePaths,
          hasImg: false
        })
      },
    })
  },

  /**
   * @description: 删除图片
   * @param {type} 
   * @return: 
   */
  deleteImages(e) {
    let index = e.currentTarget.dataset.index;
    this.data.tempFilePaths.splice(index, 1)
    if (this.data.tempFilePaths.length > 0) {
      this.setData({
        tempFilePaths: this.data.tempFilePaths,
        hasImg: false
      })
    } else {
      this.setData({
        tempFilePaths: [],
        hasImg: true
      })
    }
  },

  /**
   * @description: 图片预览
   * @param {type} 
   * @return: 
   */
  previewiewImage(e) {
    let index = e.currentTarget.dataset.index; //预览图片的编号
    wx.previewImage({
      current: this.data.tempFilePaths[index], //预览图片链接
      urls: this.data.tempFilePaths, //图片预览list列表
    })
  },

  /**
   * @description: 上传图片
   * @param {type} 
   * @return: 
   */
  uploadImage() {
    let allRequest = []
    wx.showLoading({
      title: '图片正在上传...',
      mask: 'true'
    });
    const dateTime = new Date().getTime()
    for (let i = 0; i < this.data.tempFilePaths.length; i++) {
      const element = this.data.tempFilePaths[i];
      allRequest[i] = new Promise((resolve, reject) => {
        return wx.uploadFile({
          url: api.uploadImageUrl + '?ticket=' + getApp().globalData.userInfo.ticket,
          filePath: element,
          name: 'file',
          formData: {
            faultPic: dateTime+"-"+i
          },
          success: res => {
            console.log(res)
            let response = JSON.parse(res.data);
            if (response.code == 200){
              resolve(dateTime)
            }
          }
        })
      })
    }
    Promise.all(allRequest).then(res => {
      wx.hideLoading();
      this.report(res[0]);
      // this.submitData(res)
    })
  },

  /**
   * @description: 提交数据
   * @param {type} 
   * @return: 
   */
  submitData(imgInfo) {
    let abnormalImages = ''
    imgInfo.forEach(element => {
      let index1 = element.imgPath.indexOf('uploadDirTmp')
      let index2 = element.imgPath.indexOf('jpg')
      let url = element.imgPath.substring(index1 + 14, index2 - 1)
      abnormalImages += url + ','
    })
    abnormalImages = abnormalImages.substring(0, abnormalImages.length - 1)
    let params = {
      netNum: "3e890046-7eae-43e4-af3d-f06772230814",
      reportPersonNum: getApp().globalData.userInfo.userId,
      processNum: this.data.submitParams.processNum || '',
      equipmentNum: this.data.submitParams.equipmentNum || '',
      reason: this.data.submitParams.reason || '',
      remark: this.data.submitParams.remark || '',
      abnormalImages
    }
    deviceModels.saveProcesInfo(params).then(res => {
      util.submitTipBack(res)
    })
  },

  /**
   * @description: 提交
   * @param {type} 
   * @return: 
   */
  submit: function () {
    if (this.data.equipmentNum && this.data.equipmentName){
      this.uploadImage()
    }else{
      wx.showToast({
        title: '请选择需要上报的设备',
        icon: 'none'
      })
    }
  },

  // 上报问题
  report(dateTime){
    let userInfo = getApp().globalData.userInfo;
    technologyModel.reported(this.data.detail, userInfo.userName, userInfo.userId, "1", this.data.technologyName, this.data.technologyNum, this.data.equipmentNum, this.data.equipmentName, this.data.stationNum, this.data.remark, util.dateFormatter("yyyy-MM-dd hh:mm:ss"), dateTime).then(res => {
      if (res.code == 200){
        wx.showToast({
          title: '上报成功',
          icon: 'none',
          success: ()=>{
            setTimeout(()=>{
              let pages = getCurrentPages();//当前页面
              let prevPage = pages[pages.length - 2];//上一页面
              prevPage.setData({//直接给上移页面赋值
                stationNum: this.data.stationNum,
                technologyName: this.data.technologyName,
                technologyNum: this.data.technologyNum         
              });
              // 返回上一页并重新请求页面（还没找到更便捷的方法，暂时先这么用着）
              prevPage.getTechnologyListParams();
              prevPage.getEquipmentList();
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
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