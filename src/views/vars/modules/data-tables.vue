<script setup>
import { pagination } from "@/constants/pagination";
import { h, defineProps, ref } from "vue";
import { NTag, NButton, NSwitch } from "naive-ui";
import { useSvgIcon } from "@/hooks/common/icon";
import { useStoreCode } from "@/store/modules/code";
import { typeToStr } from "@/constants/codeType";

const props = defineProps({
  openDialog: {
    type: Function,
  },
  openDrawer: {
    type: Function,
  },
});

const { SvgIconVNode } = useSvgIcon();
const checkedRowKeys = ref([]);
const codeStore = useStoreCode();
const tableRef = ref(null);
const columns = [
  {
    type: "selection",
  },
  {
    title: "卡密",
    key: "code",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "绑定应用",
    key: "name",
    render(row) {
      return h(
        NTag,
        {
          bordered: false,
          size: "small",
        },
        {
          icon: () => h(SvgIconVNode({ icon: "uim:apps" })),
          default: () => row.name,
        },
      );
    },
  },
  {
    title: "时长",
    key: "type",
    render(row) {
      return h(
        NTag,
        {
          size: "small",
        },
        {
          icon: () =>
            h(SvgIconVNode({ icon: "solar:hourglass-line-bold-duotone" })),
          default: () => typeToStr(row.type),
        },
      );
    },
  },
  {
    title: "创建时间",
    key: "createAt",
    render(row) {
      return h(
        NTag,
        {
          type: "info",
          bordered: false,
          size: "small",
        },
        {
          default: () => row.createAt,
        },
      );
    },
  },
  {
    title: "到期时间",
    key: "timeOut",
    render(row) {
      return h(
        NTag,
        {
          type: "error",
          bordered: false,
          size: "small",
        },
        {
          default: () => row.timeOut,
        },
      );
    },
  },
  {
    title: "状态",
    key: "activate",
    render(row) {
      return h(
        NTag,
        {
          type: row.activate == "已激活" ? "success" : "warning",
          size: "small",
        },
        {
          default: () => row.activate,
        },
      );
    },
  },
  {
    title: "是否封禁",
    key: "ban",
    width: 100,
    render(row) {
      return h(
        NSwitch,
        {
          size: "small",
          defaultValue: row.ban ? 1 : 0,
          checkedValue: 1,
          uncheckedValue: 0,
          onUpdateValue: (value) => {
            switchStatus(value, row);
          },
          railStyle: railStyle,
        },
        {
          checked: () => "已封禁",
          unchecked: () => "正常",
        },
      );
    },
  },
  {
    title: "绑定机器码",
    key: "macCode",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    render(row) {
      return [
        h(
          NButton,
          {
            tertiary: true,
            type: "primary",
            size: "small",
            style: {
              marginRight: "6px",
            },
            onClick: () => props.openDrawer(row),
          },
          { icon: () => h(SvgIconVNode({ icon: "tabler:edit" })) },
        ),
        h(
          NButton,
          {
            tertiary: true,
            type: "error",
            size: "small",
            onClick: () => handleDelete([row.code]), // 删除应用
          },
          { icon: () => h(SvgIconVNode({ icon: "tabler:trash-x" })) },
        ),
      ];
    },
  },
];

// 删除
const handleDelete = (codes) => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除${codes?.length}张卡密吗?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      codeStore.deleteCode({
        codes: codes,
      });
      window.$message.success("删除完成");
    },
  });
};

// 更新启用状态
const switchStatus = (value, row) => {
  codeStore.switchCode({
    uuid: row.uuid,
    code: row.code,
    status: value == 1,
  });
};

// 选中行
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys;
};

// 导出csv
const downloadCsv = () => {
  tableRef.value?.downloadCsv({ fileName: "卡密" });
};

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};

// 首次加载获取表格列表
codeStore.getTableList();
</script>

<template>
  <div>
    <NCard size="small" :style="{ width: '100%' }">
      <NFlex vertical>
        <NFlex justify="end">
          <NButton type="primary" size="small" @click="props.openDialog(null)">
            <template #icon>
              <icon-mdi:plus-thick />
            </template>
            新增
          </NButton>
          <NButton type="error" size="small" @click="handleDelete(checkedRowKeys)"
            :disabled="checkedRowKeys.length === 0">
            <template #icon>
              <icon-mdi:delete-forever-outline />
            </template>
            删除
          </NButton>
          <NButton size="small" strong secondary @click="downloadCsv">
            <template #icon>
              <icon-solar:download-bold-duotone />
            </template>
            导出
          </NButton>
          <NButton size="small" @click="codeStore.getTableList">
            <template #icon>
              <icon-mdi:refresh />
            </template>
            刷新
          </NButton>
        </NFlex>
        <NDataTable ref="tableRef" :columns="columns" :data="codeStore.filteredItems" :pagination="pagination"
          :bordered="false" :loading="codeStore.loading" size="small" :row-key="(row) => row.code"
          @update:checked-row-keys="handleCheck" />
      </NFlex>
    </NCard>
  </div>
</template>
