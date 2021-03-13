<template>
  <div v-if="hr">
    <el-col :sm="12" :lg="8" :xl="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>{{hr.name}}</strong></span>
        </div>
        <div>
          <div style="display: flex;justify-content: center">
            <!--<el-upload-->
            <!--    :show-file-list="false"-->
            <!--    :on-success="onSuccess"-->
            <!--    :data="hr"-->
            <!--    action="/user/avatar">-->
            <!--  &lt;!&ndash;<img title="Click to set new avatar" :src="hr.avatar" style="width: 100px;height: 100px;border-radius: 50px"&ndash;&gt;-->
            <!--  &lt;!&ndash;     alt="">&ndash;&gt;-->
            <!--</el-upload>-->
            <el-button type="text" @click="updateAvatarUrlDialogVisible = true">
              <el-avatar :size="100" :src="hr.avatar">
                <img src="../assets/avatar-default.png"/>
              </el-avatar>
            </el-button>
          </div>
          <table>
            <tr>
              <td><el-tag>Phone</el-tag></td>
              <td>{{hr.phone}}</td>
            </tr>
            <tr>
              <td><el-tag>Phone2</el-tag></td>
              <td>{{hr.telephone}}</td>
            </tr>
            <tr>
              <td><el-tag>Address</el-tag></td>
              <td>{{hr.address}}</td>
            </tr>
            <tr>
              <td><el-tag>Roles</el-tag></td>
              <td>
                <span type="success" style="margin-right: 5px" v-for="(r,index) in hr.roles" :key="index">
                  {{r.nameZh}}
                </span>
                <el-button type="text" disabled v-if="!hr.roles">No roles</el-button>
              </td>
            </tr>
          </table>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary" size="medium" @click="updateInfoDialogVisible = true">Update info</el-button>
          <el-button type="danger" size="medium" @click="pwdDialogVisible = true">Change password</el-button>
        </div>
      </el-card>
    </el-col>

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
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">Update Info</el-button>
          <el-button @click="reloadUserInfoForm">Reload</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--Change password form-->
    <el-dialog title="Change password" :visible.sync="pwdDialogVisible" width="30%">
      <el-form :model="updatePwdForm" status-icon :rules="rules" ref="updatePwdForm" label-position="right" label-width="9rem">
        <el-form-item label="Old password" prop="oldPwd">
          <el-input type="password" v-model="updatePwdForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="New password" prop="pwd">
          <el-input type="password" v-model="updatePwdForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password" prop="reenterPwd">
          <el-input type="password" v-model="updatePwdForm.reenterPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitUpdatePwdForm()">Update password</el-button>
          <el-button @click="resetForm('updatePwdForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--Update user avatar form-->
    <el-dialog title="Update avatar url" :visible.sync="updateAvatarUrlDialogVisible" width="30%">
      <el-form :model="avatarForm" ref="avatarForm" label-position="right" label-width="5rem">
        <el-form-item label="Avatar url">
          <el-input type="url" v-model="avatarForm.avatar"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateAvatarUrl">Update Avatar</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: "UserInfo",
  data() {
    let validatePwd = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('Password too short'));
      } else {
        if (this.updatePwdForm.reenterPwd !== '') {
          this.$refs.updatePwdForm.validateField('reenterPwd');
        }
        callback();
      }
    };
    let validateReenterPwd = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('Password too short'));
      } else if (value !== this.updatePwdForm.pwd) {
        callback(new Error('Password confirmation doesn\'t match the password'));
      } else {
        callback();
      }
    };
    return {
      updatePwdForm: {
        oldPwd: '',
        pwd: '',
        reenterPwd: ''
      },
      rules: {
        pwd: [
          {validator: validatePwd, trigger: 'blur'}
        ],
        reenterPwd: [
          {validator: validateReenterPwd, trigger: 'blur'}
        ]
      },
      infoForm: null,
      avatarForm: {
        avatar: ''
      },
      updateInfoDialogVisible: false,
      pwdDialogVisible: false,
      updateAvatarUrlDialogVisible: false
    }
  },
  computed: {
    hr() {
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    this.getUserFromServer();
  },
  methods: {
    onSuccess() {
      this.getUserFromServer();
    },
    getUserFromServer() {
      this.axios.get('/user/info').then(resp => {
        if (resp) {
          this.$store.commit('setCurrentUser', resp);
          this.reloadUserInfoForm();
        }
      })
    },
    reloadUserInfoForm() {
      this.infoForm = Object.assign({}, this.$store.state.currentUser);
    },
    updateUserInfo() {
      this.axios.put("/user/info", this.infoForm).then(resp => {
        if (resp) {
          this.updateInfoDialogVisible = false;
          this.getUserFromServer();
        }
      })
    },
    submitUpdatePwdForm() {
      this.$refs['updatePwdForm'].validate((valid) => {
        if (valid) {
          this.updatePwdForm.hrid = this.hr.id;
          this.axios.put("/user/pwd", qs.stringify(this.updatePwdForm)).then(resp => {
            if (resp) {
              this.axios.get("/logout");
              this.$store.commit('clearCurrentUser');
              this.$router.replace("/login");
            }
          })
        } else {
          return false;
        }
      });
    },
    updateAvatarUrl() {
      this.axios.post("/user/avatarUrl", qs.stringify(this.avatarForm)).then(resp => {
        if (resp) {
          this.updateAvatarUrlDialogVisible = false;
          this.getUserFromServer();
        }
      })
    },
    resetForm(formName) { this.$refs[formName].resetFields(); }
  }
}
</script>

<style scoped>
.el-dialog {
  min-width: 25rem;
}
</style>