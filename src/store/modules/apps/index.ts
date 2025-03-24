import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  fetchAppsList,
  fetchCreateOrUpdate,
  fetchDelete,
  fetchSwitch,
} from "@/service/api/apps";

export const useStoreApps = defineStore("apps", () => {
  const tableData = ref<any[]>([]); // 表格数据
  const loading = ref<boolean>(false); // 加载状态
  const searchKey = ref<string>(""); // 搜索关键字

  // 请求获取表格列表
  const getTableList = async () => {
    loading.value = true;
    try {
      const res = await fetchAppsList();
      if (!res?.data) {
        tableData.value = [];
        return;
      }
      tableData.value = res.data;
    } catch (error) {
      console.error("API取应用列表失败=>" + error);
    } finally {
      loading.value = false;
    }
  };

  // 创建或更新应用
  const createOrUpdateApp = async (data: any) => {
    loading.value = true;
    try {
      const res = await fetchCreateOrUpdate(data);
      if (!res?.data) {
        return;
      }
      getTableList();
    } catch (error) {
      console.error("API创建或更新应用失败=>" + error);
    } finally {
      loading.value = false;
    }
  };

  // 删除应用
  const deleteApp = async (uuids: string[]) => {
    loading.value = true;
    try {
      const res = await fetchDelete({ uuids });
      if (!res?.data) {
        return;
      }
      getTableList();
    } catch (error) {
      console.error("API删除应用失败=>" + error);
    } finally {
      loading.value = false;
    }
  };

  // 重置搜索
  const resetSearch = () => {
    searchKey.value = "";
  };

  // 切换应用状态
  const switchApp = async (data: any) => {
    loading.value = true;
    try {
      const res = await fetchSwitch(data);
      if (!res?.data) {
        return;
      }
      getTableList();
    } catch (error) {
      console.error("API切换应用状态失败=>" + error);
    } finally {
      loading.value = false;
    }
  };

  // 定义计算属性，实现搜索功能
  const filteredItems = computed(() => {
    var array = tableData.value;
    var keyword = searchKey.value;
    if (keyword) {
      array = array.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(keyword.toLowerCase()),
        );
      });
    }
    return array;
  });

  return {
    tableData,
    loading,
    searchKey,
    filteredItems,
    getTableList,
    createOrUpdateApp,
    deleteApp,
    resetSearch,
    switchApp,
  };
});
