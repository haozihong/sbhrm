<template>
  <div>
    <el-table :data="hrs">
      <el-table-column width="100">
        <template slot-scope="scope">
          <img class="avatar-img" :src="scope.row.avatar" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120"/>
      <el-table-column prop="phone" label="Phone" width="140"/>
      <el-table-column prop="address" label="Address"/>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">Delete</el-button>
        </template>
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
      this.axios.get("/hr").then(resp => {
        if (resp) {
          this.hrs = resp.data;
        }
      })
    },
    handleDelete(hr) {
      this.$confirm('Deleting **'+hr.name+'** permanently', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.axios.delete("/hr/" + hr.id).then(resp => {
          if (resp) {
            this.initAllHrs();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deleting cancelled'
        });
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