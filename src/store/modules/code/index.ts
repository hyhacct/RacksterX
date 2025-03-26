import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  fetchList,
  fetchCreate,
  fetchUpdate,
  fetchDelete,
  fetchSwitch,
} from "@/service/api/code";
import { fetchPreview } from "@/service/api/apps";

// 搜索类型
interface Search {
  keyword: string;
  type: string | null;
  uuid: string | null;
}

export const useStoreCode = defineStore("code", () => {
  const tableData = ref<any[]>([]); // 表格数据
  const loading = ref<boolean>(false); // 加载状态
  const search = ref<Search>({
    keyword: "", // 搜索关键字
    type: null, // 搜索类型
    uuid: null, // 搜索应用uuid
  });
  const appsOptions = ref<any[]>([]); // 应用UUID选项

  // 重置搜索
  const resetSearch = () => {
    search.value = {
      keyword: "",
      type: null,
      uuid: null,
    };
  };

  // 获取表格列表
  const getTableList = async () => {
    loading.value = true;
    try {
      const res = await fetchList();
      if (!res?.data) {
        tableData.value = [];
        return;
      }
      tableData.value = res.data;
      console.log("API获取表格列表", tableData.value);
    } catch (error) {
      console.log("API获取表格列表失败", error);
    } finally {
      loading.value = false;
    }
  };

  // 创建卡密
  const createCode = async (data: any) => {
    loading.value = true;
    try {
      await fetchCreate(data);
      getTableList();
    } catch (error) {
      console.log("API创建卡密失败", error);
    } finally {
      loading.value = false;
    }
  };

  // 获取apps应用名字和uuid
  const getAppsPerview = async () => {
    try {
      const res = await fetchPreview();
      if (!res?.data) {
        appsOptions.value = [];
        return;
      }
      appsOptions.value = res.data;
    } catch (error) {
      console.log("API获取应用列表失败", error);
    }
  };

  // 更新卡密
  const updateCode = async (data: any) => {
    loading.value = true;
    try {
      await fetchUpdate(data);
      getTableList();
    } catch (error) {
      console.log("API更新卡密失败", error);
    } finally {
      loading.value = false;
    }
  };

  // 删除卡密
  const deleteCode = async (data: any) => {
    loading.value = true;
    try {
      await fetchDelete(data);
      getTableList();
    } catch (error) {
      console.log("API删除卡密失败", error);
    } finally {
      loading.value = false;
    }
  };

  // 更新启用状态
  const switchCode = async (data: any) => {
    loading.value = true;
    try {
      await fetchSwitch(data);
      getTableList();
    } catch (error) {
      console.log("API更新启用状态失败", error);
    } finally {
      loading.value = false;
    }
  };

  // 定义计算属性，实现搜索功能
  const filteredItems = computed(() => {
    var array = tableData.value;
    var keyword = search.value.keyword;
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
    filteredItems,
    search,
    resetSearch,
    getTableList,
    createCode,
    getAppsPerview,
    updateCode,
    deleteCode,
    switchCode,
    appsOptions,
  };
});
