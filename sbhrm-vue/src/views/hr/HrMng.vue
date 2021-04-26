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
              type="primary"
              @click="loadHrInfoForm(scope.row); updateInfoDialogVisible = true">Update info</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Update user info form-->
    <el-dialog title="Update user info" :visible.sync="updateInfoDialogVisible" width="30%">
      <el-form v-if="infoForm" :model="infoForm" status-icon ref="infoForm" label-position="right" label-width="5rem">
        <el-form-item label="Name">
          <el-input v-model="infoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input type="tel" v-model="infoForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Phone2">
          <el-input type="tel" v-model="infoForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input type="textarea" v-model="infoForm.address"></el-input>
        </el-form-item>
        <el-form-item label="Avatar url">
          <el-input type="url" v-model="infoForm.avatar"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateHrInfo">Update Info</el-button>
          <el-button @click="reloadHrInfoForm">Reload</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HrMng",
  data() {
    return {
      hrs: [],
      infoForm: { originalHr: null },
      updateInfoDialogVisible: false,
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
    },
    loadHrInfoForm(hr) {
      if (hr !== this.infoForm.originalHr) {
        this.infoForm = Object.assign({}, hr);
        this.infoForm.originalHr = hr;
      }
    },
    reloadHrInfoForm() {
      Object.assign(this.infoForm, this.infoForm.originalHr);
      console.log(this.infoForm);
    },
    updateHrInfo() {
      this.axios.put(`/admin/hr/${this.infoForm.id}`, this.infoForm).then(resp => {
        if (resp) {
          this.updateInfoDialogVisible = false;
          this.initAllHrs();
        }
      })
    },
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