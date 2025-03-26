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
  uuid: string | null;
}

export const useStoreVars = defineStore("vars", () => {
  const tableData = ref<any[]>([]); // 表格数据
  const loading = ref<boolean>(false); // 加载状态
  const search = ref<Search>({
    keyword: "", // 搜索关键字
    uuid: null, // 搜索应用uuid
  });
  const appsOptions = ref<any[]>([]); // 应用UUID选项

  // 重置搜索
  const resetSearch = () => {
    search.value = {
      keyword: "",
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
    appsOptions,
  };
});
