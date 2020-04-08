// pages/index/index.js

// 引入echarts
import * as echarts from '../../lib/ec-canvas/echarts';
// 引入封装好的函数
import {
  IndexModel
} from '../../models/index'
// 引入公共函数
import * as util from '../../utils/util.js'
const indexModel = new IndexModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 今日日期
    today: util.dateFormatter("yyyy-MM-dd"),
    // 昨天日期
    yesterday: util.dateFormatter("yyyy-MM-dd", new Date(new Date().getTime() - 24 * 60 * 60 * 1000)),
    // 今年
    year: util.dateFormatter("yyyy"),
    // 今日生产信息
    productionData: null,
    // 昨日生产信息
    productionYesData: null,
    // 昨日对比百分比
    percentData:{},
    // 昨日对比上升图标地址
    upImage: "../../asset/imgs/index/up.png",
    // 昨日对比下降图标地址
    downImage: "../../asset/imgs/index/down.png",
    // 厂站信息
    factoryInfo: [],
    // 进水水质信息
    inWaterQualityData: null,
    // 出水水质信息
    outWaterQualityData: null,
    // 进出水水质厂站切换按钮值
    factoryNum: "1",
    // 碳源投加情况echarts图
    carbonSource: {
      lazyLoad: true // 延迟加载
    },
    // 碳源投加情况数据
    carbonSourceData:null,
    // 一厂碳源投加情况数据
    carbonSourceOne:0,
    // 二厂碳源投加情况数据
    carbonSourceTwo:0,
    // 预警信息echarts图
    warnInfo: {
      lazyLoad: true // 延迟加载
    },
    // 预警信息数据
    warnData: null,
    // 预警信息下方文字说明小圆点颜色
    warnColor: ["#3aa1ff", "#36cbcb", "#4ecb73", "#fbd437", "#f2637b", "#975fe5", "#5254cf"],
    // 整理好的预警数据
    warnSortedData:{},
    // 今日垃圾ecahrts图
    rubbish:{
      lazyLoad: true // 延迟加载
    },
    // 今日垃圾数据
    rubbishTodayData:null,
    // 区域垃圾数据
    rubbishAreaData: null,
    // 区域垃圾echarts图
    rubbishArea:{
      lazyLoad: true // 延迟加载
    },
    // 类型垃圾数据
    rubbishTypeData: null,
    // 类型垃圾echarts图
    rubbishType: {
      lazyLoad: true // 延迟加载
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取今日生产信息
    this.getProductionData();
    // 获取碳源投加情况信息
    this.getCarbonSourceData();
    // 获取预警信息
    this.getWarnData();
    // 获取厂站信息
    this.getFactoryInfo();
    // 获取今日垃圾信息
    this.getRubbishToday();
    // 获取区域生活垃圾信息
    this.getRubbishArea();
    // 获取类型垃圾信息
    this.getRubbishType();
  },

  // 获取今日生产信息
  getProductionData() {
    indexModel.getProductionInfo(this.data.today).then(res => {
      this.setData({
        productionData: res.data
      });
      indexModel.getProductionInfo(this.data.yesterday).then(res => {
        this.setData({
          productionYesData: res.data
        });
        this.setData({
          percentData: this.sortProductionPercent(this.data.productionData, this.data.productionYesData)
        })
      });
    })
  },

  // 整理昨日对比的百分比(待验证，因为今日数据为0)
  sortProductionPercent(data,yesData){
    console.log(data.effSum);
    console.log(data.yesData);
    const obj = {
      eff:{
      },
      enter:{
      },
      out:{
      }
    }
    if (yesData.effSum == 0){
      obj.eff.value = 0;
      obj.eff.flag = 1;
    }else{
      if (Number(data.effSum) > Number(yesData.effSum)){
        obj.eff.flag = 1;
        obj.eff.value = ((Number(data.effSum) - Number(yesData.effSum)) / Number(yesData.effSum) * 100).toFixed(2);
      }else{
        obj.eff.flag = -1;
        obj.eff.value = ((Number(yesData.effSum) - Number(data.effSum)) / Number(yesData.effSum) * 100).toFixed(2);
      }
    }
    if (yesData.enter.sum == 0){
      obj.enter.value = 0;
      obj.enter.flag = 1;
    }else{
      if (data.enter.sum > yesData.enter.sum) {
        obj.enter.flag = 1;
        obj.enter.value = ((data.enter.sum - yesData.enter.sum) / yesData.enter.sum * 100).toFixed(2);
      } else {
        obj.enter.flag = -1;
        obj.enter.value = ((yesData.enter.sum - data.enter.sum) / yesData.enter.sum * 100).toFixed(2);
      }
    }
    if (yesData.out.sum == 0){
      obj.out.value = 0;
      obj.out.flag = 1;
    } else {
      if (data.out.sum > yesData.out.sum) {
        obj.out.flag = 1;
        obj.out.value = ((data.out.sum - yesData.out.sum) / yesData.out.sum * 100).toFixed(2);
      } else {
        obj.out.flag = -1;
        obj.out.value = ((yesData.out.sum - data.out.sum) / yesData.out.sum * 100).toFixed(2);
      }
    }
    return obj;
  },

  // 获取厂站信息
  getFactoryInfo(){
    indexModel.getFactoryInfo().then(res => {
      this.setData({
        factoryInfo: res.data,
        factoryNum: res.data[0].stationNum
      });
      this.getWaterQuality(this.data.factoryNum);
    })
  },

  // 获取厂站进出水水质信息
  getWaterQuality(factoryNum){
    this.getInWaterQuality(factoryNum);
    this.getOutWaterQuality(factoryNum);
  },

  // 获取厂站进水水质信息
  getInWaterQuality(stationNum) {
    indexModel.getWaterQuality(this.data.today, stationNum, "1").then(res => {
      this.setData({
        inWaterQualityData: res.data
      });
    });
  },

  // 获取厂站出水水质信息
  getOutWaterQuality(stationNum) {
    indexModel.getWaterQuality(this.data.today, stationNum, "2").then(res => {
      this.setData({
        outWaterQualityData: res.data
      });
    });
  },

  // 进出水水质厂站切换函数
  changeFactory(e) {
    this.setData({
      factoryNum: e.currentTarget.dataset.num ? e.currentTarget.dataset.num : "1"
    });
    this.getWaterQuality(this.data.factoryNum);
  },

  // 获取碳源投加情况数据
  getCarbonSourceData(){
    indexModel.getCarbonSource(this.data.today).then(res=>{
      this.setData({
        carbonSourceData:res.data
      });
      this.createCarbonCharts(res.data);
      this.sortCarbonData(res.data)
    })
  },

  // 整理碳源投加信息
  sortCarbonData(data){
    data = data.data;
    for(var i = 0;i<data.length;i++){
      if (data[i].title == '一厂'){
        this.setData({
          carbonSourceOne: data[i].data[data[i].data.length - 1]
        })
      }else if (data[i].title == '二厂'){
        this.setData({
          carbonSourceTwo: data[i].data[data[i].data.length - 1]
        })
      }
    }
  },

  // 获取预警信息数据
  getWarnData(){
    indexModel.getWarnInfo(this.data.year).then(res => {
      this.setData({
        warnData: res.data
      });
      this.createWarnCharts(res.data);
      this.setData({
        warnSortedData: this.sortWarnData(res.data)
      })
    })
  },

  // 整理预警信息数据
  sortWarnData(data){
    const obj = {
      sum: 0,
      data: []
    }
    for (var i = 0; i < data.length; i++) {
      obj.sum += data[i].value;
    }
    for (var i = 0; i < data.length; i++){
      if (obj.sum == 0){
        data[i].percent = 0;
      }else{
        data[i].percent = (data[i].value/obj.sum*100).toFixed(2);
      }
    }
    obj.data = data;
    return obj;
  },

  // 获取今日垃圾总量数据
  getRubbishToday(){
    indexModel.getRubbishToday(this.data.today).then(res => {
      this.setData({
        rubbishTodayData: res.data
      });
      this.createRubbishTodayCharts(res.data);
    })
  },

  // 获取区域垃圾数据
  getRubbishArea(){
    indexModel.getRubbishArea(this.data.today).then(res => {
      this.setData({
        rubbishAreaData: res.data
      });
      this.createRubbishAreaCharts(res.data);
    })
  },

  // 获取类型垃圾数据
  getRubbishType() {
    indexModel.getRubbishType(this.data.today).then(res => {
      this.setData({
        rubbishTypeData: res.data
      });
      this.createRubbishTypeCharts(res.data);
    })
  },

  // 创建碳源投加情况echarts图
  createCarbonCharts(data){
    this.carbonCharts = this.selectComponent('#carbonCharts');
    this.carbonCharts.init((canvas, width, height) => {
      const carbonCharts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      carbonCharts.setOption(this.carbonSourceOption(data));
      return carbonCharts;
    });
  },

  // 创建预警信息echarts图
  createWarnCharts(data) {
    this.warnCharts = this.selectComponent('#warnCharts');
    this.warnCharts.init((canvas, width, height) => {
      const warnCharts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      warnCharts.setOption(this.warnInfoOption(data));
      return warnCharts;
    });
  },

  // 创建今日垃圾echarts图
  createRubbishTodayCharts(data){
    this.rubbishCharts = this.selectComponent('#rubbishCharts');
    this.rubbishCharts.init((canvas, width, height) => {
      const rubbishCharts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      rubbishCharts.setOption(this.rubbishTodayOption(data));
      return rubbishCharts;
    });
  },

  // 创建区域垃圾echarts图
  createRubbishAreaCharts(data){
    this.areaCharts = this.selectComponent('#areaCharts');
    this.areaCharts.init((canvas, width, height) => {
      const areaCharts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      areaCharts.setOption(this.rubbishAreaOption(data));
      return areaCharts;
    });
  },

  // 创建类型垃圾echarts图
  createRubbishTypeCharts(data) {
    this.typeCharts = this.selectComponent('#typeCharts');
    this.typeCharts.init((canvas, width, height) => {
      const typeCharts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      typeCharts.setOption(this.rubbishTypeOption(data));
      return typeCharts;
    });
  },

  // 碳源投加情况echarts图配置
  carbonSourceOption(data) {
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: 'shadow'
        }
      },
      title: {
        left: 30,
        top: "0%",
        textStyle: {
          fontSize: 13,
          fontWeight: 700
        }
      },
      grid: {
        left: 50,
        right: 30,
        top: 40,
        bottom: 50
      },
      legend: {
        bottom: "0%",
        data: []
      },
      color: ["#1890ff", "#2fc25b"],
      xAxis: {
        axisTick: { show: false },
        data: data.xAxis ? data.xAxis : []
      },
      yAxis: {
        name: "吨",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        },
        axisLabel: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: []
    };
    var item;
    if (data.data) {
      for (var i = 0; i < data.data.length; i++) {
        item = data.data[i];
        option.series.push({
          type: "bar",
          // barWidth: 20,
          barGap: 0,
          name: item.title,
          data: item.data
        });
        option.legend.data.push(item.title);
      }
    }
    return option;
  },

  // 预警信息echarts配置
  warnInfoOption(data){
    return {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {d}%"
      },
      color: ["#3aa1ff", "#36cbcb", "#4ecb73", "#fbd437", "#f2637b", "#975fe5", "#5254cf"],
      legend: {
        //				    orient: 'vertical',
        icon: 'circle',
        left: 'center',
        bottom: 20,
        data: []
      },
      series: [
        {
          type: 'pie',
          radius: '48%',
          center: ['50%', '45%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            // 这里做改变
            normal: {
              label: {
                show: true,
                formatter: '{b}:{d}%',
                position: 'outside',
                fontSize: 10
              },
              labelLine: {
                show: true
              }
            }
          }
        }
      ]
    };
  },

  // 今日垃圾echarts图配置
  rubbishTodayOption(data){
    return {
      color: ["#1890ff"],
      title:{
        text: "今日垃圾总量",
        top: 0,
        textStyle: {
          fontSize: 13
        }
      },
      grid: {
        top: 35,
        left: 60
      },
      legend:{
        data:["垃圾总量"],
        bottom: 10
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xAxis
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        }
      },
      series: [{
        data: data.data,
        type: 'line',
        name:["垃圾总量"],
        areaStyle: {
          color: '#b9ddff'
        }
      }]
    }
  },

  // 区域垃圾echarts图配置
  rubbishAreaOption(data){
    const option = {
      tooltip : {
        trigger: 'item',
        formatter: "{b} : {d}%"
			},
      color: ["#3aa1ff", "#36cbcb", "#4ecb73", "#fbd437", "#f2637b", "#975fe5", "#5254cf"],
      legend: {
        icon: 'circle',
        left: 'center',
        bottom: 10,
        data: []
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '45%'],
          center: ['50%', '45%'],
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            // 这里做改变
            normal: {
              label: {
                show: true,
                formatter: '{b}:{d}%',
                position: 'outside',
                fontSize: 10
              },
              labelLine: {
                show: true
              }
            }
          }
        }
      ]
    };
    for(var i = 0; i<data.length;i++){
      option.series[0].data.push({
        name: data[i].areaName,
        value: data[i].weight
      });
      option.legend.data.push(data[i].areaName);
    }
    console.log(JSON.stringify(option))
    return option;
  },

  // 类型垃圾echarts图配置
  rubbishTypeOption(data){
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {d}%"
      },
      color: ["#3aa1ff", "#88d1ea", "#36cbcb", "#82dfbe", "#4ecb73", "#acdf82", "#fbd437", "#eaa674", "#f2637b", "#dc81d2", "#975fe5"],
      legend: {
        icon: 'circle',
        left: 'center',
        bottom: 10,
        data: []
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '45%'],
          center: ['50%', '45%'],
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            // 这里做改变
            normal: {
              label: {
                show: true,
                formatter: '{b}:{d}%',
                position: 'outside',
                fontSize: 10
              },
              labelLine: {
                show: true
              }
            }
          }
        }
      ]
    };
    for (var i = 0; i < data.length; i++) {
      option.series[0].data.push({
        name: data[i].litterName,
        value: data[i].weight
      });
      option.legend.data.push(data[i].litterName);
      this.rubbishTotal += data[i].weight;
    }
    return option;
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