<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right:10px">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/images/user.png" alt="" />
              <div class="user-info">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2022-11-11</span></p>
              <p>上次登录地点：<span>杭州</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 20px; height: 460px">
            <el-table :data="tableData" style="width: 100%" >
              <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"> </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" style="padding-left:10px">
        <div class="num">
          <el-card body-style="display:flex;padding:0" v-for="item in countData" :key="item.name">
           <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
           <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
           </div>
          </el-card>
        </div>
        <div>
          <el-card style="height:280px">
            <!-- 折线图 -->
            <div ref="echarts1" style="height:280px" >
            </div>
          </el-card>
        </div>
        <div class="graph">
          <el-card style="height:260px">
           <div ref="echarts2" style="height:260px"></div>
          </el-card>
          <el-card style="height:260px">
           <div ref="echarts3" style="height:240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'
export default {
  name: "Home",
  data() {
    return {
      tableData: [
      ],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'

      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted(){
    getData().then(({data})=>{
      const{tableData}=data.data
      this.tableData=tableData
      var echarts1=echarts.init(this.$refs.echarts1)
      var  myChartsoption={

      }
      const {orderData,userData,videoData}=data.data
      // console.log(orderData)
      const  xAxis=Object.keys(orderData.data[0])
      console.log(xAxis)
      console.log(orderData.data)
      myChartsoption.yAxis={

      },
      myChartsoption.xAxis={
        data:xAxis
      },
      myChartsoption.legend={
        data:xAxis
      },
      myChartsoption.series=[]
      xAxis.forEach(value=>{
        myChartsoption.series.push(
          {
            name:value,
            data:orderData.data.map((item) => 
             item[value]
            
          ),
          type:'line'
         
          }
        )
        
      })
      echarts1.setOption(myChartsoption);

     
      //柱状图
      var echarts2=echarts.init(this.$refs.echarts2)
      var  echarts2option={
        legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item =>item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data:userData.map(item =>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:userData.map(item =>item.active),
              type:'bar'
            }
          ],
      }

      echarts2.setOption(echarts2option);
      //饼状图
      var echarts3=echarts.init(this.$refs.echarts3)
      var  echarts3option={
        tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }

          ],
      }
      echarts3.setOption(echarts3option);
    })
    

  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      margin-left: 60px;
      color: #666666;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;

  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card{
    height: 260px;
    width: 48%;
  }
}
</style>