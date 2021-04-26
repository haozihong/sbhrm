<template>
  <div>
    <el-table :data="hrs" :empty-text="tableEmptyText">
      <el-table-column width="100">
        <template slot-scope="scope">
          <img class="avatar-img" :src="scope.row.avatar" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120"/>
      <el-table-column prop="phone" label="Phone" width="140"/>
      <el-table-column prop="address" label="Address"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HrList",
  data() {
    return {
      hrs: [],
      tableEmptyText: "No Data"
    }
  },
  mounted() {
    this.initAllHrs();
  },
  methods: {
    initAllHrs() {
      this.tableEmptyText = "Fetching Data...";
      this.axios.get("/admin/hr").then(resp => {
        if (resp) {
          this.hrs = resp;
        }
        this.tableEmptyText = "No Data";
      });
    }
  }
}
</script>

<style scoped>
.avatar-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
</style>