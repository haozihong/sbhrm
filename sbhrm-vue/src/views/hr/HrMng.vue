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
  name: "HrMng",
  data() {
    return {
      hrs: []
    }
  },
  mounted() {
    this.initAllHrs();
  },
  methods: {
    initAllHrs() {
      this.axios.get("/admin/hr").then(resp => {
        if (resp) {
          this.hrs = resp;
        }
      })
    },
    handleDelete(hr) {
      this.$confirm('Deleting **'+hr.name+'** permanently', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.axios.delete("/admin/hr/" + hr.id).then(resp => {
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