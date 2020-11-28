<template>
  <div>
      
    <el-container>
        <el-aside class="aside" width="450px">
            <h2>输入区域：</h2>
             <textarea
            v-model="value"
            class="inputArea"
            cols="50%"
            rows="35"
          ></textarea>
        </el-aside>
        <el-main>
            <h2>json数据预览区域</h2>
            <textarea
            v-model="value2"
            class="inputArea2 inputArea"
            cols="50%"
            rows="20"
            readonly
          ></textarea>
        </el-main>
    </el-container>
      <div class="button">
        <el-button type="primary" @click="textToJson">JSON化</el-button>
      </div>
      <div class="button2">
        <el-button type="success" @click="tableToExcel">导出</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      value2: "",
    };
  },
  methods: {
    textToJson() {
      let data = this.value;
      let count = this.getStrCount(data, "姓名");
      console.log(count);
      let content = "";
      let rdata = data.replace(/姓名/g, "isName");
      rdata = rdata.replace(/面试时间/g, "isTime");
      rdata = rdata.replace(/意向区域/g, "isArea");
      rdata = rdata.replace(/年龄/g, "isAge");
      rdata = rdata.replace(/岗位/g, "isJob");
      rdata = rdata.replace(/身份证/g, "isId");
      rdata = rdata.replace(/学历/g, "isGrade");
      rdata = rdata.replace(/手机号/g, "isPhone");
      rdata = rdata.replace(/\s*/g, "");
      console.log("第一次操作数据", rdata);
      if (count == 1) {
        rdata = rdata.split("is");
        rdata = rdata.slice(1);
        console.log("只存在一个数据");
        content = this.getJson(rdata);
        this.value2 = content;
      } else {
        console.log("存在多个数据");
        let datas = rdata.split("|");
        console.log(datas);
        let arr = [];
        for (let i = 0; i < count; i++) {
          datas[i] = datas[i].split("is");
          datas[i] = datas[i].slice(1);
          arr.push(this.getJson(datas[i]));
        }
        console.log(arr);
        this.value2 = '[' + arr.join(",") + ']'
      }
    },
    getJson(data) {
      var string = "";
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].replace(/：/g, ":");
        data[i] = data[i].replace(/\s*/g, "");
        data[i] = data[i].replace(/:/g, '":"');
        if (string == "") {
          string = string + "{" + '"' + data[i];
        } else {
          string = string + '"' + "," + '"' + data[i];
        }
      }
      string = string + '"' + "}";
      return string;
    },
    getStrCount(scrstr, armstr) {
      //scrstr 源字符串 armstr 特殊字符
      var count = 0;
      while (scrstr.indexOf(armstr) != -1) {
        scrstr = scrstr.replace(armstr, "");
        count++;
      }
      return count;
    },
    tableToExcel(){
        let str = `意向区域,面试时间,姓名,年龄,岗位,身份证,学历,手机号\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      let jsonData = JSON.parse(this.value2)
      for(let i = 0 ; i < jsonData.length ; i++ ){
        for(let item in jsonData[i]){
            str +=`${jsonData[i][item] + '\t'},`;     
        }
        str+='\n';
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "json数据表.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
};
</script>

<style>
::-webkit-scrollbar{
width: 0;  height: 0;
}
body {
  background: #f1f1f1;
  height: 100%;
}
.aside{
    margin-left: 50px;
}

.inputArea {
  border: 0;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  resize: none;
  outline:none;
}

.button {
  position: absolute;
  right: 100px;
  bottom: 100px;
  z-index: 999;
}
.button2 {
  position: absolute;
  right: 100px;
  bottom: 40px;
  z-index: 999;
}

</style>