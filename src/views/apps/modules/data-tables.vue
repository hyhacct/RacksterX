<script setup>
import { pagination } from '@/constants/pagination';
import { h, defineProps, ref, defineExpose } from 'vue';
import { NTag, NButton, NSwitch } from 'naive-ui';
import { useSvgIcon } from '@/hooks/common/icon';
import { useStoreApps } from '@/store/modules/apps';

const props = defineProps({
  openDialog: {
    type: Function,
  },
})

const { SvgIconVNode } = useSvgIcon();
const checkedRowKeys = ref([]);
const appsStore = useStoreApps();

const columns = [
  {
    type: 'selection',
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: 'UUID',
    key: 'uuid',
    width:300,
    render(row) {
      return h(
        NTag,
        {
          bordered: false,
          size: 'small',
        },
        {
          default: () => row.uuid
        }
      )
    }
  },
  {
    title: '描述',
    key: 'desc',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '版本',
    key: 'version',
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
          bordered: false,
          size: 'small',
        },
        {
          default: () => row.version
        }
      )
    }
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NSwitch,
        {
          size: 'small',
          defaultValue: row.status ? 1 : 0,
          checkedValue: 1,
          uncheckedValue: 0,
          onUpdateValue: value => {
            switchStatus(value, row);
          }
        },
        {
          checked: () => "已启用",
          unchecked: () => "已停用"
        }
      )
    }
  },
  {
    title: '下载地址',
    key: 'downloadUrl',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render(row) {
      return [
        h(
          NButton,
          {
            tertiary: true,
            type: 'primary',
            size: 'small',
            style: {
              marginRight: '6px'
            },
            onClick: () => props.openDialog(row)
          },
          { icon: () => h(SvgIconVNode({ icon: 'tabler:edit' })) }
        ),
        h(
          NButton,
          {
            tertiary: true,
            type: 'error',
            size: 'small',
            onClick: () => handleDelete(row, [row.uuid]) // 删除应用
          },
          { icon: () => h(SvgIconVNode({ icon: 'tabler:trash-x' })) }
        )
      ]
    }
  },
];

// 删除
const handleDelete = (row, uuids) => {
  window.$dialog.warning({
    title: '警告',
    content: `确定删除[${row ? row.name : uuids.length + '个应用'}]吗? 属于此应用的卡密也将一并清除`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      appsStore.deleteApp(uuids); // 删除应用
    },
    onNegativeClick: () => {
      window.$message.success('取消删除')
    }
  })
}

// 更新应用启用状态
const switchStatus = (value, row) => {
  appsStore.switchApp({
    uuid: row.uuid,
    status: value == 1,
  })
}

// 选中行
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys;
}

// 首次加载获取表格列表
appsStore.getTableList();
</script>

<template>
  <div>
    <NCard size="small">
      <NFlex vertical>
        <NFlex justify="end">
          <NButton type="primary" size="small" @click="props.openDialog(null)">
            <template #icon>
              <icon-mdi:plus-thick />
            </template>
            新增
          </NButton>
          <NButton type="error" size="small" @click="handleDelete(null, checkedRowKeys)"
            :disabled="checkedRowKeys.length === 0">
            <template #icon>
              <icon-mdi:delete-forever-outline />
            </template>
            删除
          </NButton>
          <NButton size="small" @click="appsStore.getTableList">
            <template #icon>
              <icon-mdi:refresh />
            </template>
            刷新
          </NButton>
        </NFlex>
        <NDataTable :columns="columns" :data="appsStore.filteredItems" :pagination="pagination" :bordered="false"
          :loading="appsStore.loading" size="small" :row-key="row => row.uuid" @update:checked-row-keys="handleCheck" />
      </NFlex>
    </NCard>
  </div>
</template>