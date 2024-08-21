<script setup>
import { ref, onMounted } from "vue";
import { Menu } from "@element-plus/icons-vue";
const searchInput = ref("");
const isLoggedIn = ref(false);
const permissions = ref(null);

const apiNames = {
  search: "/product",
  logout: "/user/logout",
};
const loginPermissions = (val) => {
  permissions.value = val;
};
const changeLoginStatus = (val) => {
  isLoggedIn.value = val === "success" ? true : false;
};
defineExpose({ changeLoginStatus, loginPermissions });

import { ElMessage, ElMessageBox } from "element-plus";

const token = localStorage.getItem("token");
const getPermissions = parseInt(localStorage.getItem("permissions"));
onMounted(() => {
  if (token) {
    isLoggedIn.value = true;
    permissions.value = getPermissions;
  }
});

const logoutEvent = () => {
  ElMessageBox.confirm("<h2>確定要登出?</h2>", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    confirmButtonClass: "confirmButtonClass",
    cancelButtonClass: "cancelButtonClass",
    center: true,
    dangerouslyUseHTMLString: true,
  })
    .then(() => {
      isLoggedIn.value = false;
      getApi(apiNames.logout, null, { Authorization: `Bearer ${token}` });
      permissions.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      ElMessage({
        message: "登出成功",
        type: "success",
      });
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      ElMessage({
        message: "登出失敗",
        type: "error",
      });
    });
};

const language = ref("繁體中文");
function changeLanguage(item) {
  language.value = item;
}

// const languageList = ref(["繁體中文", "简体中文", "English", "日本語"]);
const drawer = ref(false);
import { getApi } from "../api/index";

const params = ref({ name: "all", page: 1, page_size: 20 });

const emit = defineEmits(["searchEvent"]);
const searchEvent = () => {
  if (searchInput.value === "") return;

  params.value.name = searchInput.value;

  getApi(apiNames.search, params.value)
    .then((response) => {
      router.push("/");

      if (response.data.product) {
        emit("searchEvent", response.data.product);
      } else {
        alert("查無此產品");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("查詢失敗");
    });
  setTimeout(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, 1000);
};

import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();

function routerToPage(page) {
  router.push(`/${page}`);
}

function closeDrawer(page) {
  routerToPage(page);
  drawer.value = false;
}

const logoutEventRwd = () => {
  ElMessageBox.confirm("<h2>確定要登出?</h2>", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    confirmButtonClass: "confirmButtonClass",
    cancelButtonClass: "cancelButtonClass",
    center: true,
    dangerouslyUseHTMLString: true,
  })
    .then(() => {
      isLoggedIn.value = false;
      localStorage.removeItem("token");
      ElMessage({
        message: "登出成功",
        type: "success",
      });
      drawer.value = false;
    })
    .catch(() => {
      ElMessage({
        message: "登出失敗",
        type: "error",
      });
    });
};
const isUser = ref(false);

const isManager = ref(false);
</script>
<template>
  <el-container>
    <el-header>
      <el-row class="nav-box">
        <el-col :xs="8" :span="4">
          <el-row @click="routerToPage('home')">
            <el-col :span="8" class="logo-col">
              <img class="logo" src="../assets/vue.svg" alt="" />
            </el-col>
            <el-col :span="16" class="title-col">
              <span class="bibiQ-title">bibi-Q</span>
            </el-col>
          </el-row>
        </el-col>

        <el-col :xs="0" :span="14" :offset="6">
          <el-row class="toolsMenu">
            <el-col :span="10">
              <el-input
                type="text"
                v-model="searchInput"
                style="width: 60%; height: 35px; font-size: 20px"
                placeholder="Search"
              />
              <el-button class="search-button" text @click="searchEvent">
                <el-icon size="25px"><Search /></el-icon>
              </el-button>
            </el-col>

            <el-col :span="4" :offset="2">
              <el-button
                class="userButton"
                text
                v-show="permissions === 0"
                @click="routerToPage('user')"
                >使用者</el-button
              >
              <el-button
                class="managerButton"
                text
                v-show="permissions === 1"
                @click="routerToPage('manage')"
                >管理者</el-button
              >
            </el-col>
            <el-col :span="4" v-if="!isLoggedIn">
              <el-button
                class="loginButton"
                text
                @click="routerToPage('login')"
              >
                <span>登入</span>
              </el-button>
            </el-col>
            <el-col :span="4" v-else>
              <el-button class="logoutButton" text @click="logoutEvent">
                <span>登出</span>
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                class="shoppingCartButton"
                text
                @click="routerToPage('shoppingCart')"
              >
                <el-icon size="25px" style="color: rgba(0, 0, 0, 0.6)"
                  ><ShoppingCart
                /></el-icon>
              </el-button>
            </el-col>
            <!-- <el-col :span="5">
              <el-dropdown trigger="click" class="dropdown-box">
                <div
                  style="display: flex; align-items: center; user-select: none"
                >
                  <img
                    src="../assets/globe-icon-96x96-6gmgebx3.png"
                    width="24px"
                    alt="globel"
                  />
                  <span style="margin-left: 10px">{{ language }}</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in languageList"
                      @click="language = item"
                      >{{ item }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col> -->
          </el-row>
        </el-col>

        <el-col :xs="{ span: 4, offset: 12 }" :sm="0">
          <div @click="drawer = true">
            <el-icon :size="30"><Menu /></el-icon>
          </div>
          <el-drawer v-model="drawer" size="75%">
            <template #header>
              <h3 style="text-align: left; margin: 20px">bibi-Q</h3>
            </template>

            <div class="search-input-rwd">
              <el-input
                type="text"
                v-model="searchInput"
                style="width: 75%"
                placeholder="Search"
              />
              <el-button class="search-button" text @click="searchEvent">
                <el-icon size="25px"><Search /></el-icon>
              </el-button>
            </div>
            <el-menu>
              <el-menu-item index="1" @click="closeDrawer('shoppingCart')">
                <span>查看購物車</span>
              </el-menu-item>
              <el-menu-item index="2" @click="closeDrawer('user')">
                <span>使用者</span>
              </el-menu-item>
              <el-menu-item index="3" @click="closeDrawer('manage')">
                <span>管理者</span>
              </el-menu-item>
              <el-menu-item
                v-if="!isLoggedIn"
                index="4"
                @click="closeDrawer('login')"
              >
                <span>登入/註冊</span>
              </el-menu-item>
              <el-menu-item v-else index="5" @click="logoutEventRwd">
                <span>登出</span>
              </el-menu-item>
              <!-- <el-sub-menu index="6">
                <template #title>
                  <span style="font: 400 24px Helvetica">{{ language }}</span>
                </template>
                <el-menu-item
                  v-for="(item, index) in languageList"
                  :index="`5 - ${index}`"
                  @click="changeLanguage(item)"
                  >{{ item }}</el-menu-item
                >
              </el-sub-menu> -->
            </el-menu>
          </el-drawer>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>
<style>
.el-header {
  width: 100%;
  height: 100%;
  background-color: rgba(234, 179, 165, 0.8);
  box-shadow: 0 0 0 2px #000;
}

.el-row {
  color: #000000;
}
.logo-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-col .logo {
  width: 35px;
  height: 35px;
}
.title-col {
  height: 75px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.bibiQ-title {
  font: 600 28px "";
  user-select: none;
}
.nav-box {
  align-items: center;
}
.toolsMenu {
  align-items: center;
}
.search-button {
  box-sizing: content-box;
  margin-left: 10px;
  width: 25px;
  height: 25px;
  padding: 5px;
  transition: 0.5s;
}
.search-button:hover {
  background-color: #000000;
}
.userButton,
.managerButton {
  width: 50%;
  font: 600 18px "";
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(245, 245, 245, 0.8) !important;
  box-shadow: 0 0 0 2px #000;
  transition: 0.3s;
}
.userButton:hover,
.managerButton:hover {
  color: rgb(245, 245, 245);
  background-color: rgba(63, 169, 235, 0.8) !important;
}

.loginButton,
.logoutButton {
  width: 50%;
  font: 600 18px "";
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(245, 245, 245, 0.8) !important;
  box-shadow: 0 0 0 2px #000;
  transition: 0.3s;
}
.loginButton:hover,
.logoutButton:hover {
  color: rgb(245, 245, 245);
  background-color: rgba(225, 80, 107, 0.8) !important;
}
.shoppingCartButton {
  box-sizing: content-box;
  width: 25px;
  height: 25px;
  clip-path: circle(50% at 50% 50%);
  padding: 10px;
  transition: 0.5s;
}
.shoppingCartButton:hover {
  background-color: rgba(245, 245, 245, 0.8);
}

.dropdown-box {
  padding: 4px 10px;
}
.dropdown-box:hover {
  border-radius: 5px;
  background-color: rgba(255, 254, 254, 0.973);
}

.drawer-row .el-col {
  margin: 10px 0;
}
.search-input-rwd {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  margin-bottom: 32px;
}

.el-menu-item {
  font: 400 24px Helvetica;
  justify-content: start;
}

.el-sub-menu .el-menu-item {
  justify-content: end;
}

.confirmButtonClass {
  color: #000 !important;
  background-color: #8bc5c5 !important;
  font: 700 16px Helvetica;
  border: #000 1px inset;
}
.cancelButtonClass {
  color: #000 !important;
  background-color: #fff !important;
  font: 700 16px Helvetica;
  border: #000 1px inset;
}
</style>
