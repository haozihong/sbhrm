<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="Phone" width="140">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HrList",
  data() {
    const item = {
      phone: '123123123',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      hrs: []
    }
  },
  mounted() {
    this.initAllHrs();
  },
  methods: {
    initAllHrs() {
      this.getRequest("/hr").then(resp => {
        if (resp) {
          this.hrs = resp;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>