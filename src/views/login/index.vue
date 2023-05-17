<template>
  <div class="container">
    <div class="login">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <!-- <i class="el-icon-user-solid"></i> -->
          <el-input type="password" v-model="formInline.user" placeholder="激活码">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">激活</el-button>
        </el-form-item>
      </el-form>
      <span @click="getcode" class="MachineCode">查看机器码</span>
      <span v-show="isOK" class="code">{{ MachineCode }}</span>
    </div>
  </div>
</template>

<script>
const { machineIdSync } = require("node-machine-id");
import { decryptStr } from "../../util/aes_ecb";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      MachineCode: "",
      isOK: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit() {
      // console.log(this.MachineCode);
      // console.log(this.formInline.user);
      let str_enc = this.formInline.user;
      let str_dec = JSON.parse(decryptStr(str_enc));
      console.info("解密后：", str_dec);
      if (str_dec.code === this.MachineCode) {
        this.$message("激活码正确");

        const fs = require("fs");
        fs.writeFile("./code/code.txt", str_enc, (err, data) => {
          if (err) {
            throw err;
          }
          this.$message("激活码写入成功", data);
        });


        if (str_dec.endtime !== "") {
          let date = new Date();
          let str = date.getTime();
          console.log(str);
          if (str_dec.endtime < str) {
            this.$message("软件已到期");
          } else {
            this.$message("软件未到期");
            this.$router.push('/home')
          }
        } else {
          this.$message("软件已过期");

        }



      } else {
        this.$message("激活码错误");
      }

    },
    getcode() {
      this.isOK = true;
    },
    relogin(data) {
      let str_dec = JSON.parse(decryptStr(data));
      console.log(str_dec, "解密后");
      if (str_dec.endtime !== "" && str_dec.code === this.MachineCode) {
        let date = new Date();
        let str = date.getTime();
        console.log(str);

        if (str_dec.endtime < str) {
          this.$message("软件已到期");
        } else {
          this.$message("软件未到期");
          this.$router.push('/home')
        }
      }
    },
  },
  created() { },
  mounted() {
    const fs = require("fs");
    let code = machineIdSync();
    console.log(code, 'code');
    this.MachineCode = code;
    //先判断有没有存过code
    var relogin = this.relogin;
    fs.readFile("./code/code.txt", function (err, data) {
      if (err === null) {
        // console.log(data);
        // this.relogin(data)
        // console.log('进来了');
        console.log(data, 'data');

        relogin(data.toString());
      }
    });
  },
  destroyed() { },
  activated() { },
};
</script>
<style scoped>
.container {
  /* background-color: ; */
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-form-inline {
  display: flex;
  flex-direction: column;
}

.container>>>.el-input__inner {
  border-radius: 20px;
}

.container>>>.el-button {
  border-radius: 20px;
  width: 100%;
}

.container>>>.el-form-item {
  margin-bottom: 10px;
  width: 100%;
}

.container>>>.el-form-item__content {
  width: 100%;
}

.container>>>.el-button--primary {
  background-color: #595a5c;
}

.MachineCode {
  text-align: right;
  /* padding-right: 20px; */
  font-size: small;
  cursor: pointer;
}

.code {
  margin-top: 10px;
  width: 200px;
  /* overflow: hidden; */
  word-wrap: break-word;
}
</style>