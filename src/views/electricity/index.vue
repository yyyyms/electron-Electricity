<template>
  <div class="Container">
    <div class="gasTable">
      <span class="title">智能送电预测应用</span>
      <!-- <input style="display: none" id="file2" ref="files2" type="file" @change="uploadData2($event, '3')"
        accept=".doc,.docx,.pdf,.ai,.psd,.json" multiple="multiple" />
      <el-button class="top-button" @click="readfile('3')" plain>导入</el-button>
      <el-button class="top-button" @click="writefile('3')" plain>导出</el-button> -->
    </div>
    <div class="main">
      <div class="one-two">
        <div class="one">
          <div class="one-top">
            <span class="title">电价配置</span>
            <input style="display: none" id="file" ref="files" type="file" @change="uploadData($event, '1')"
              accept=".doc,.docx,.pdf,.ai,.psd,.json" multiple="multiple" />

            <el-button @click="readfile('1')" class="top-button" plain>
              导入</el-button>
            <el-button class="top-button" plain @click="writefile('1')">导出</el-button>
            <el-button class="top-button" plain @click="empty">清空</el-button>
            <el-button class="top-button" @click="open()" plain> 记录</el-button>
            <el-button class="top-button" @click="saveConfig()" plain> 保存配置</el-button>

            <div class="jiancha">
              <el-button class="top-button1" @click="check" plain>检查</el-button>
            </div>

            <!-- <el-button class="top-button" plain
              ><span @click="CalculatedPrice">计算</span></el-button
            > -->
          </div>
          <div class="one-bottom" style="height: 20vh">
            <el-table height="100%" :data="tableData" style="width: 100%">
              <el-table-column prop="type" label="电价种类" min-width="40">
                <template v-slot="{ row }">
                  <el-select v-model="row.type" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="电价(元/kwh)" min-width="60">
                <template v-slot="{ row }">
                  <el-input placeholder="请输入" v-model="row.price" style="width: 80%; height: 100%"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="endTime" label="开始时间" min-width="50">
                <template v-slot="{ row }">
                  <el-time-picker value-format="HH:mm" format="HH:mm" v-model="row.startTime" placeholder="时间">
                  </el-time-picker>
                </template>
              </el-table-column>
              <el-table-column prop="endTime" label="结束时间" min-width="50">
                <template v-slot="{ row }">
                  <el-time-picker value-format="HH:mm" format="HH:mm" v-model="row.endTime" placeholder="时间">
                  </el-time-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="insert1(scope.$index, tableData)" type="text" size="small">
                    插入
                  </el-button>
                  <el-button @click.native.prevent="deleteRow1(scope.$index, tableData)" type="text" size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="two">
          <div class="one-top">
            <span class="title">电价配置</span>
          </div>
          <div ref="one" class="echart1"></div>
        </div>
      </div>
      <div class="three-four">
        <div class="three">
          <div class="one-top">
            <span class="title">曲线配置</span>
            <input style="display: none" id="file1" ref="files1" type="file" @change="uploadData1($event)"
              accept=".doc,.docx,.pdf,.ai,.psd,.json" multiple="multiple" />
            <el-button class="top-button" plain @click="readfile('2')">导入</el-button>
            <!-- <el-button class="top-button" plain
              ><span>设置条数</span></el-button
            > -->
            <el-button class="top-button" @click="writefile('2')" plain>导出</el-button>
            <el-button class="top-button" @click="empty1" plain>清空</el-button>
            <div class="jiancha1">
              <div class="heji">
                <el-button class="top-button" plain><span style="font-size: 12px;"
                    @click="Calculate1()">计算</span></el-button>
                <span style="margin-left: 10px;padding-top: 2px;">
                  电量 {{ totalPower }}kwh | 时长{{ totalTime }}
                </span>
              </div>

            </div>
            <!-- <el-button class="top-button" plain
              ><span @click="Calculate">计算</span></el-button
            > -->
          </div>
          <div class="one-bottom" style="height: 60vh">
            <el-table height="100%" :data="tableData1" style="width: 100%">
              <el-table-column type="index" prop="stage" label="阶段" width="80">
              </el-table-column>
              <el-table-column prop="targetPt" label="目标功率(kw)" min-width="60">
                <template v-slot="{ row }">
                  <el-input type="el" @blur="Calculate1" placeholder="请输入" v-model.number="row.targetPt"
                    style="width: 60%; height: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="时长(分钟)" min-width="50">
                <template v-slot="{ row }">
                  <el-input type="el" @blur="Calculate1" placeholder="请输入" v-model.number="row.time"
                    style="width: 60%; height: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="Power" label="消耗电量" min-width="50">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="insert2(scope.$index, tableData1)" type="text" size="small">
                    插入
                  </el-button>
                  <el-button @click.native.prevent="deleteRow1(scope.$index, tableData1)" type="text" size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="four">
          <div class="one-top">
            <span class="title">送电预测扫描</span>
            <el-button class="top-button" plain><span @click="Allscanning">全天扫描</span></el-button>
          </div>
          <div ref="two" class="echart2"></div>
          <div class="four-bottom">
            <el-table :data="tableData2" style="width: 100%">
              <el-table-column prop="type" label="送电时间" min-width="50">
              </el-table-column>
              <el-table-column prop="startTime" label="送电开始时间" min-width="50">
                <template v-slot="{ row }">
                  <el-time-picker @blur="Allscanning1(row.startTime)" value-format="HH:mm" format="HH:mm"
                    v-model="row.startTime" placeholder="时间">
                  </el-time-picker>
                </template>
              </el-table-column>
              <el-table-column prop="endTime" label="送电结束时间" min-width="50">
              </el-table-column>
              <el-table-column prop="sumPrice" label="总电价" min-width="50">
              </el-table-column>
              <el-table-column prop="avergePrice" label="平均电价" min-width="50">
              </el-table-column>
              <!-- <el-table-column prop="difference" label="差额" min-width="50">
              </el-table-column> -->
            </el-table>
            <div class="bottom-table">
              <el-table :data="tableData3" style="width: 100% margin-top:10px">
                <el-table-column prop="type" label="电价种类" min-width="50">
                </el-table-column>
                <el-table-column prop="price" label="电价(元/kwh)" min-width="50">
                </el-table-column>
                <el-table-column prop="priceRatio" label="电价占比" min-width="50">
                </el-table-column>
                <el-table-column prop="Power" label="电量" min-width="50">
                </el-table-column>
                <el-table-column prop="PowerRatio" label="电量占比" min-width="50">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer size="50%"  :visible.sync="drawer" :direction="direction">
      <div class="record-head">
        <span>
          历史记录
        </span>
      </div>
      <div :class="getClass">
        <el-table :data="recordTabledata" border>
          <el-table-column type="index" width="40">
          </el-table-column>
          <el-table-column prop="province" label="名称" width="80">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="80">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="80">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button @click="openOne(scope.row)" type="text" size="small">打开</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import { write } from "./Import_export.js";
// import { ipcRenderer } from 'electron'
import json1 from "./test.json";
import json2 from "./test1.json";
import * as echarts from "echarts";
import { allDayScanning, allDayScanning2 } from "./All-day-calculation";
import {
  sendElectricityone,
  sendElectricitytwo,
  sendElectricitythree,
} from "../../api/test.js";
import { openDB } from "./indexDB";
export default {
  data() {
    return {
      getClass:'record-table1',
      recordTabledata:[{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '1516 弄',
          zip: 200333
        }],
      addEditDialogTableVisible: false,
      dialogtwo: false,
      dialogthree: false,
      ruleForm: {
        createTime: "",
        _id: "",
        typeName: "",
        desc: "",
        protocolName: "",
        domains: [
          {
            startTime: "",
            endTime: "",
            price: 0,
          },
        ],
      },
      Form2: {
        domains: [
          {
            targetPt: "",
            time: "",
          },
        ],
      },
      arr1: [],
      arr2: [],
      arr3: [],
      disabled: true,
      disabledSensor: true,
      rules: {
        typeName: [
          { required: true, message: "请填写类型名称", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写类型描述", trigger: "blur" }],
        protocolName: [
          { required: true, message: "请填写协议名称", trigger: "blur" },
        ],
      },
      firstX: [],
      secondX: [],
      tableData: [
        {
          type: "谷电",
          startTime: "00:00",
          endTime: "00:00",
          price: 0
        },
      ],
      basePrice: [],
      tableData1: [
        {
          stage: "自定义",
          targetPt: 0,
          time: 0,
          Power: 0
        },
      ],
      tableData2: [],
      tableData3: [],
      fileList: [],
      timeIsOk: true,
      minPower: [],
      mapPrice: "",
      totalPower: 0,
      totalTime: 0,
      options: [{
        value: '谷电',
        label: '谷电'
      }, {
        value: '平电',
        label: '平电'
      }, {
        value: '峰电',
        label: '峰电'
      }, {
        value: '尖峰',
        label: '尖峰'
      }],
      Max: 0,
      Min: 0,
      drawer: false,
      direction: 'ltr',

    };
  },
  computed: {},
  watch: {},
  methods: {
    //第一个echarts
    firstE(arr) {
      // console.log(arr);
      option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: 9, // 字体大小
          },
          formatter: function (data) {
            let a = data[0].data[1];
            let b = data[0].dataIndex;
            b = Math.floor(b / 60);
            let c = data[0].dataIndex - 60 * b;
            if (c > 10 && b > 10) {
              return `${a}元<br/>${b}:${c} `;
            } else if (c < 10 && b < 10) {
              return `${a}元<br/> 0${b}:0${c}`;
            } else if (c < 10 && b > 10) {
              return `${a}元<br/>${b}:0${c}`;
            } else if (c > 10 && b < 10) {
              return `${a}元<br/>0${b}:${c}`;
            }
          },
        },
        grid: {
          x: "10%",
          top: "5%",
          bottom: "25%",
          right: "10%",
        },
        xAxis: {
          maxInterval: 60,
          Interval: 60,
          type: "value",
          data: this.firstX,
          alignTicks: true,
          alignTick: {
            length: 1,
          },
          axisLabel: {
            textStyle: {
              fontSize: "8",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: "8",
            },
          },
        },
        series: [
          {
            symbol: "none",
            data: arr,
            type: "line",
            smooth: true,
            dataMax: 5,
            itemStyle: {
              normal: {
                color: "#0591f5", //改变折线点的颜色
                lineStyle: {
                  color: "#409EFF", //改变折线颜色
                },
              },
            },
          },
        ],
      };
      var myChart = echarts.init(this.$refs.one);
      var option;

      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
        // console.log(1111);
      });
    },
    //第二个echarts
    secondE(arr, max, min) {
      console.log(arr, max, min);
      // console.log(111111);
      // console.log(this.secondX,'x轴');
      option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: 9, // 字体大小
          },
          formatter: function (data) {
            let a = data[0].data[1]
            let b = data[0].dataIndex;
            b = Math.floor(b / 60);
            let c = data[0].dataIndex - 60 * b;
            if (c > 10 && b > 10) {
              return `<br/> ${a}元<br/>${b}:${c} `;
            } else if (c < 10 && b < 10) {
              return `<br/>${a}元<br/> 0${b}:0${c}`;
            } else if (c < 10 && b > 10) {
              return `<br/>${a}元<br/>${b}:0${c}`;
            } else if (c > 10 && b < 10) {
              return `<br/>${a}元<br/>0${b}:${c}`;
            }
          },
          // '{b0}<br/>{c0}'
        },
        title: {
          text: "",
        },
        grid: {
          x: "15%",
          top: "15%",
          bottom: "15%",
          right: "10%",
          left: "10%",
        },
        xAxis: {
          type: "value",
          data: '',

          // alignTicks: true,
          // alignTick: {
          //   length: 1,
          // },
          maxInterval: 60,
          Interval: 60,
          axisLabel: {
            textStyle: {
              fontSize: "8",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: "8",
            },
          },
          min: function (value) {
            return value.min - 1000;
          },
        },
        series: [
          {
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
              symbolSize: 5,
              symbolOffset: [20, -10]
            },

            symbol: 'emptyCircle',
            symbolSize: function (value) {
              // console.log(max,min);
              if (value[1] === max || value[1] === min) {
                return '5'
              } else {
                return '0'
              }
            },
            data: arr,
            type: "line",
            smooth: false,
            dataMax: 5,
            itemStyle: {
              normal: {
                color: "#0591f5", //改变折线点的颜色
                lineStyle: {
                  color: "#409EFF", //改变折线颜色
                },
              },
            },
          },
        ],
      };
      var myChart1 = echarts.init(this.$refs.two);
      var option;

      myChart1.setOption(option);
      window.addEventListener("resize", () => {
        myChart1.resize();
      });
    },
    //生成数组
    createArr() {
      let arr = new Array();
      for (let i = 0; i < 1440; i++) {
        arr.push(i);
      }
      this.firstX = arr;
      // console.log(this.firstX, "横坐标数组");
    },
    createArr2() {

      let arr = new Array();
      for (let i = 0; i < 1440; i++) {
        arr.push(i);
      }
      this.secondX = arr;
    },
    handleEditAndCreate(handle, index, row) {
      console.log("rowssss", row);
      if (handle === "add") {
        this.ruleForm = {
          // 不能赋空 否则domains不显示了

          domains: json1.data,
        };
        this.addEditDialogTableVisible = true;
      }
    },
    create2() {
      this.dialogtwo = true;
      this.Form2;
    },
    create3() {
      console.log("arr1", this.arr1);
      console.log("arr2", this.arr2);
      const test = {
        basePrice: this.arr1,
        ptCurveData: this.arr2,
      };
      sendElectricitythree(test).then((res) => {
        console.log("第三阶段", res);
        this.arr3 = res.data.data;
      });
    },
    cancelForm() {
      this.addEditDialogTableVisible = false;
      this.dialogtwo = false;
      this.dialogthree = false;
    },
    addDomain() {
      // console.log('this.ruleForm.domains.length', this.ruleForm.domains.length)
      if (this.ruleForm.domains.length < 1) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.ruleForm.domains.push({
        startTime: "",
        endTime: "",
        price: 0,
      });
    },
    addDomain2() {
      // console.log('this.ruleForm.domains.length', this.ruleForm.domains.length)
      if (this.Form2.domains.length < 1) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.Form2.domains.push({
        targetPt: "",
        time: "",
      });
    },
    removeDomain(item) {
      if (this.ruleForm.domains.length <= 2) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      var index = this.ruleForm.domains.indexOf(item);
      console.log("序号", index);
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1);
      }
      console.log(this.ruleForm.domains);
    },
    removeDomain2(item) {
      if (this.Form2.domains.length <= 2) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      var index = this.Form2.domains.indexOf(item);
      console.log("序号", index);
      if (index !== -1) {
        this.Form2.domains.splice(index, 1);
      }
      console.log(this.ruleForm.domains);
    },
    submitForm(e) {
      console.log(e);
      const test = {
        basePowerInput: e,
      };
      // const basePowerInput = []
      console.log(test, "第一次参数");
      sendElectricityone(test).then((res) => {
        console.log("第一阶段", res);
        this.arr1 = res.data.data;
        console.log(this.arr1);
        this.addEditDialogTableVisible = false;
        this.firstE();
      });
    },
    submitForm2(e) {
      console.log(e);
      const test = {
        ptStage: e,
      };
      // const basePowerInput = []
      console.log(test);
      sendElectricitytwo(test).then((res) => {
        console.log("第二阶段", res);
        const data2 = res.data.data.data;
        for (let i = 0; i < data2.length; i++) {
          const element = data2[i];
          this.arr2.push(element.pt);
        }
        // this.secondE();
        this.dialogtwo = false;
      });
    },
    // 更新表中数据
    updatePrice(rows) {
      console.log(rows);
      rows.update = 0;
      rows.price = 1;
    },
    deleteRow1(index, tableData) {
      console.log(index, tableData);
      if (tableData.length !== 1) {
        tableData.splice(index, 1);
      }
    },
    insert1(index, tableData) {
      // let obj = JSON.parse(JSON.stringify(tableData[index]));
      tableData.splice(index + 1, 0, {
        type: "",
        startTime: "00:00",
        endTime: "00:00",
        price: 0
      },);
      console.log(index, tableData);
    },
    insert2(index, tableData) {
      // let obj = JSON.parse(JSON.stringify(tableData[index]));
      tableData.splice(index + 1, 0, {
        stage: "自定义",
        targetPt: 0,
        time: 0,
        Power: 0
      },);
      console.log(index, tableData);
    },
    //检查输入时间
    check() {
      this.timeIsOk = true;
      // console.log(this.tableData);
      let arr = this.tableData;
      // console.log(arr);
      //检查 start 和 end
      let sum = 0;
      let array = new Array();
      let basePrice = [];
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.startTime !== null && element.endTime !== null) {
          let startmin = this.minutes(element.startTime);
          let endmin = this.minutes(element.endTime);
          let price = element.price;
          //  console.log(startmin);
          for (let j = startmin; j <= endmin; j++) {
            array[j] = isNaN(array[j]) ? 1 : array[j] + 1;
            basePrice[j] = price;
          }
          //  console.log(startmin,endmin);
          sum += endmin - startmin + 1;
        } else if (this.timeIsOk === true) {
          this.$message("时间输入有误1");
          this.timeIsOk = false;
          break;
        }
      }
      // console.log(array, "检查重复结果");
      // console.log(basePrice, "每分钟电价");
      this.basePrice = basePrice;
      let baseArr = basePrice.map((element, index) => {
        return [index, element]
      })
      // this.basePrice = baseArr
      console.log(this.basePrice, "基础电价");
      for (let i = 0; i < array.length; i++) {
        if (array[i] > 1 && this.timeIsOk === true) {
          this.timeIsOk = false;
          this.$message("时间输入有误2");

          break;
        }
      }
      // console.log(sum);
      if (sum === 1440 && this.timeIsOk === true) {
        this.$message("时间输入正确");
        this.timeIsOk = true;

        this.firstE(baseArr);
      } else {
        this.$message("时间输入有误3");
        this.timeIsOk = false;

      }
    },
    startandEnd(start, end) {
      if (start > end) {
        alert("时间输入有误");
      }
    },
    //计算分钟数
    minutes(time) {
      if (time === null) {
        return alert("时间输入有误");
      }
      let arr = time.split(":");
      let sum = arr[0] * 60 + arr[1] * 1;
      return sum;
    },
    //计算每分钟电价
    CalculatedPrice() {
      this.check();
      // console.log(this.basePrice);

      // this.firstE(this.basePrice);
    },
    async uploadData(e, params) {
      if (params === "1") {
        // console.log(e.target.files[0]);
        const file = e.target.files[0];
        let reader = new FileReader();
            reader.readAsText(file, "utf8");//异步的
            let _this = this
          reader.onload = function(){
            console.log(reader.result,"yms");
            console.log('电价配置导入');
          let res = _this.$Decrypt(reader.result);
          console.log(JSON.parse(res));
          try {
            _this.tableData = JSON.parse(res);
            _this.$refs.files.value = "";
            
          } catch (error) {
            _this.$message(error)
          }
          }
        // console.log(this.$refs.files);
      } else if (params === "2") {
        const file = e.target.files1[0];
        let reader = new FileReader();
        reader.readAsText(file, "utf8");
        setTimeout(() => {
          // console.log( instanceof Array);
          console.log(JSON.parse(reader.result));
          this.tableData1 = JSON.parse(reader.result);
        }, 1);
        // console.log(this.$refs.files);

        this.$refs.files1.value = "";
      }
    },
    uploadData1(e) {
      console.log('曲线配置导入');
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      let _this = this
      reader.onload = function(){
        let res = _this.$Decrypt(reader.result);
        try {
          _this.tableData1 = JSON.parse(res);
          _this.$refs.files1.value = "";
        
        } catch (error) {
          _this.$message(error)
        }
      }


    },
    uploadData2(e) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      let _this = this
      reader.onload= function () {
        let res = _this.$Decrypt(reader.result);
        res = JSON.parse(res);
        console.log(res);
        _this.tableData = res[0], 
        _this.tableData1 = res[1];
        _this.$refs.files2.value = "";
      }

    },
    readfile(e) {
      if (e === "1") {
        let input = this.$refs.files;
        input.click();
      } else if (e === "2") {
        let input = this.$refs.files1;
        input.click();
      } else if (e === "3") {
        let input = this.$refs.files2;
        input.click();
      }
    },
    writefile(e) {
      console.log(11111);
      console.log(e);
      if (e === "1") {
        const content = JSON.stringify(this.tableData);
        let Encryptchepai = this.$Encrypt(content);
        const element = document.createElement("a");
        const file = new Blob([Encryptchepai], { type: "json" });
        element.href = URL.createObjectURL(file);
        element.download = "file.json";
        element.click();
      } else if (e === "2") {
        const content = JSON.stringify(this.tableData1);
        let Encryptchepai = this.$Encrypt(content);

        const element = document.createElement("a");
        const file = new Blob([Encryptchepai], { type: "json" });
        element.href = URL.createObjectURL(file);
        element.download = "file.json";
        element.click();
      } else if (e === "3") {
        const arr = [this.tableData, this.tableData1];
        const content = JSON.stringify(arr);
        console.log(content);
        let Encryptchepai = this.$Encrypt(content);

        const element = document.createElement("a");
        const file = new Blob([Encryptchepai], { type: "json" });
        element.href = URL.createObjectURL(file);
        element.download = "file.json";
        element.click();
      }
    },
    //计算电量
    Calculate() {
      // console.log(this.tableData1[3].targetPt);
      let end;
      let endPt;
      let start;
      let startPt;
      let minPower = [];
      let totalPowers = 0;
      let totalTime = 0;
      this.tableData1.forEach((element, index) => {
        // console.log(element);
        if (index === 0) {
          end = element.time - 1;
          start = 0;
          startPt = 0;
          endPt = this.tableData1[index].targetPt * 1;
        } else {
          start = 0;
          end = element.time - 1;
          startPt = this.tableData1[index - 1].targetPt * 1;
          endPt = this.tableData1[index].targetPt * 1;
        }
        let everymin = [];
        let k = (endPt - startPt) / (end + 1);
        // if (index === 0) {
        //   console.log(this.tableData1);
        //   console.log(startPt);
        //   console.log(endPt);
        //   console.log(end);
        //   console.log(k);
        // }

        let sum = 0;
        for (let i = start + 1; i <= end + 1; i++) {
          let obj = {
            pt: (startPt + (i - 1) * k + (startPt + i * k)) / 2,
            minPower: (startPt + (i - 1) * k + (startPt + i * k)) / 2 / 60,
          };
          sum = (startPt + (i - 1) * k + (startPt + i * k)) / 2 / 60 + sum * 1;
          everymin.push(obj);
        }
        // console.log(sum);
        element.Power = sum.toFixed(0) * 1;
        totalPowers = totalPowers + element.Power;
        totalTime = totalTime * 1 + element.time * 1;
        console.log(totalPowers, "调试");
        minPower = minPower.concat(everymin);
        console.log(element.time, "时长");
      });
      // console.log(minPower);
      console.log(this.tableData1);
      this.minPower = minPower;
      this.totalPower = totalPowers;
      let h = Math.floor(totalTime / 60);

      let m = totalTime % 60;
      if (m < 10) {
        totalTime = h + ":" + "0" + m;
      } else {
        totalTime = h + ":" + m;
      }
      this.totalTime = totalTime;
    },
    Calculate1(e) {
      console.log(e);
      this.Calculate();
    },
    //计算每个时间段的电量
    // Calculateones(end,endPt,startPt,start = 0){

    //   return sum
    // },
    Allscanning() {
      this.everyPrice();
      this.Calculate();
      this.check();
      let isCustomize = false;
      // if (time) {
      //   isCustomize = true
      // }

      if (this.timeIsOk === true) {
        console.log(this.timeIsOk, '1111111');
        const res = allDayScanning(
          this.basePrice,
          this.tableData1,
          this.minPower,
          this.mapPrice,
          isCustomize
        );

        console.log(res);
        if (res) {
          this.tableData2 = res.secondTable;
          this.tableData3 = res.lastTable;
          let arr = JSON.parse(JSON.stringify(res.sumArr))
          // this.secondE();
          let max = Math.max(...arr)
          let min = Math.min(...arr)
          this.Max = max
          this.Min = min
          // let [maxIndex,minIndex] = [arr.indexOf(max),arr.indexOf(min)]
          // console.log(max,maxIndex,min,minIndex);
          let newArr = arr;
          // newArr[maxIndex] = { value: arr[maxIndex], symbol: 'emptyCircle', symbolSize: 6 };  // 对数据最大值进行封装
          // newArr[minIndex] = { value: arr[minIndex], symbol: 'emptyCircle', symbolSize: 6 };  // 对数据最小值进行封装
          // console.log(newArr,'1440总价');
          let Earr = newArr.map((element, index) => {
            return [index, element]
          })
          console.log(Earr, '1440总价');
          this.secondE(Earr, max, min)
          console.log(this.Max, this.Min);
        }
      }
      // console.log(this.tableData2,'全面扫描1');
      // console.log(this.tableData2,'全面扫描1');

    },
    Allscanning1() {
      this.everyPrice();
      this.Calculate();
      this.check();
      let isCustomize = true;
      if (this.timeIsOk) {
        const res = allDayScanning2(
          this.basePrice,
          this.tableData1,
          this.minPower,
          this.mapPrice,
          isCustomize,
          this.tableData2[1].startTime
        );

        console.log(res, "返回结果");
        if (res) {
          this.tableData2.pop();
          this.tableData2.push(res.secondTable[0]);

          console.log(this.tableData2);
          this.tableData3 = res.lastTable;
        }
        console.log(this.tableData2, '全面扫描2');

      }

    },
    //记录电价种类
    everyPrice() {
      // let everyPrice = []
      const map = new Map(arguments);

      this.tableData.forEach((element) => {
        if (!map.has(element.type)) {
          map.set(element.type, element.price);
        }
      });
      // console.log(map);
      this.mapPrice = map;
    },
    empty() {
      this.tableData = [
        {
          type: "谷电",
          startTime: "00:00",
          endTime: "00:00",
          price: 0
        },
      ]
    },
    empty1() {
      this.tableData1 = [
        {
          stage: "自定义",
          targetPt: 0,
          time: 0,
          Power: 0
        },
      ]
    },
    open() {
      this.drawer = true
    },
    openOne() {

    },
    saveConfig(){
      console.log(this.tableData,'1');
    }
  },
  created() { },
  mounted() {
    openDB('electricity').then((res)=>{
      console.log(res,'db');
    })
    this.createArr();
    this.createArr2();
    // this.submitForm(json1)
    // this.firstE();
    // this.secondE();
    // this.ruleForm.domains = json1.data
    // console.log(json1.data);
    // this.tableData = json1.data;
    // this.tableData1 = json2.data;
    this.Form2.domains = json2.data;
    window.addEventListener('resize',()=>{
      if (this.getClass === 'record-table') {
        this.getClass = 'record-table1'
      }else {
        this.getClass = 'record-table'
      }
      
    })
  },
  destroyed() { },
  activated() { },
};
</script>
<style  scoped>
.record-head {
  margin:  20px 0 ;
}
.Container>>>.el-drawer__header {
  display: none;
}
.record-table {
  width: 70%;
  margin: auto;
}
.record-table1 {
  width: 100%;
  margin: auto;
}
.Container {
  background-color: #eceff4;
  height: 100%;
}

.gasTable {
  color: black;
  font-weight: 1000;
  font-size: small;
  background-color: #fff;
  box-sizing: border-box;
  padding: 5px 20px 5px 10px;
  display: flex;
  box-shadow: 1px 1px 1px #cbd1d1;
}

.title {
  margin-right: 10px;
  font-weight: 1000;
  font-size: small;
}

.top-button {
  width: 60px;
  margin-left: 15px;
  padding: 0;
  font-size: smaller;
  color: #0591f5;
  font-weight: 500;
  border-radius: 0;
}

.top-button1 {
  width: 60px;
  margin-left: 70%;
  padding: 0;
  height: 100%;
  font-size: 11px;
  color: #0591f5;
  font-weight: 500;
  border-radius: 0;
}

.jiancha {
  display: flex;
  flex: 1;
  width: 60px;
  margin-left: 15px;
  padding: 0;
  font-size: smaller;
  color: #0591f5;
  font-weight: 500;
  border-radius: 0;
}

.jiancha1 {
  display: flex;
  flex: 1;
  width: 60px;
  margin-left: 15px;
  padding: 0;
  font-size: smaller;
  /* color: #0591f5; */
  font-weight: 500;
  border-radius: 0;
  justify-content: flex-end;

}

.heji {
  margin-right: 20px;
  display: flex;
  padding: 0;
  height: 100%;
  font-size: 12px;
  font-weight: 500;
  border-radius: 0;
  align-content: center;
  vertical-align: baseline
}

.main {
  padding: 10px 12px 5px 12px;
}

.one-two {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.three-four {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.one {
  margin-right: 10px;
  /* margin-bottom: 10px; */
  width: 53vw;
  background-color: #fff;
  height: 25vh;
  box-shadow: 1px 1px 1px #ccd1d1;
  display: flex;
  flex-direction: column;
}

.one-bottom {
  /* padding-top: 10px; */
  width: 100%;
  overflow-y: scroll;
}

.one-bottom>>>.el-input__suffix {
  display: none;
}

.one-bottom>>>.el-select-dropdown {
  /* padding: 0 5px 0 5px; */
  min-width: 40px !important;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: rgb(255, 255, 255);
}

.Container>>>.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* // 滚动条的滑块 */
.Container>>>.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgba(212, 214, 215, 0.646);
  border-radius: 2px;
}

.Container>>>.el-table__header-wrapper {
  font-size: smaller;
}

.Container>>>.el-table th.el-table__cell {
  color: #000;
  font-weight: 400;
}

.Container>>>.el-table__body-wrapper {
  font-size: smaller;
}

.Container>>>.el-table .el-table__cell {
  padding: 0;
}

.Container>>>.el-input__inner {
  height: 33px;
  line-height: 10px;
  padding: 0 5px;
  font-size: smaller;
  border-radius: 0;
  border: #fff;
  background-color: transparent;
}

.Container>>>.el-input__inner:focus {
  border: 1px solid #0494fa;
}

.Container>>>.el-input__prefix {
  display: none;
}

.Container>>>.el-date-editor {
  width: 50px;
}

.Container>>>.el-input__suffix {
  /* display: none; */
  right: -20px;
  top: -3px;
}

.Container>>>.el-range__icon {
  display: none;
}

.Container>>>.el-table__row {
  height: 33px;
}

.bottom-table {
  margin-top: 20px;
}

.one-top {
  /* margin-bottom: 10px; */
  display: flex;
  padding: 5px 0 12px 10px;
  font-size: small;
  /* box-shadow: 1px 1px 1px #ced3d3; */
}

.two {
  width: 45vw;
  background-color: #fff;
  height: 25vh;
  box-shadow: 1px 1px 1px #ccd1d1;
}

.echart1 {
  height: 80%;
}

.echart2 {
  height: 40%;
}

.three {
  margin-right: 10px;
  width: 53vw;
  background-color: #fff;
  height: 67vh;
  box-shadow: 1px 1px 1px #ccd1d1;
}

.four {
  width: 45vw;
  background-color: #fff;
  height: 67vh;
  box-shadow: 1px 1px 1px #ccd1d1;
}

.four-bottom {
  height: 30%;
}

.btn {
  margin-bottom: 15px;
  width: 200px;
}

.el-button--primary {
  background-color: #4d70ff;
  border-color: #4d70ff !important;
}

.list {
  display: flex;
  word-break: normal;
  align-content: space-between;
  margin-left: 15px;
}

.list_left {
  margin-right: 5px;
}

.echarts {
  height: 400px;
  display: flex;
}

.total {
  font-size: 12px;
  padding-top: 3px;
  margin-left: 5%;
}
</style>