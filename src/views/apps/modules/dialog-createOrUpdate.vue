<script setup>
import { ref, defineExpose, defineProps } from 'vue'
import { fetchCreateOrUpdate } from '@/service/api/apps'
import { useStoreApps } from '@/store/modules/apps';

const appsStore = useStoreApps();
const title = ref('新建应用')
const formRef = ref(null)
const showModal = ref(false)
const form = ref({
  name: '',
  desc: '',
  version: '',
  downloadUrl: '',
  status: true,
  uuid: '',
})
const rules = {
  name: [{
    required: true,
    message: '请输入应用名称',
    trigger: 'blur',
  }],
  version: [{
    required: true,
    message: '请输入应用版本',
    trigger: 'blur',
  }],
};

// 打开弹窗
const open = (row) => {
  clearForm();
  if (row) {
    form.value = JSON.parse(JSON.stringify(row))
    title.value = '编辑应用'
  }
  showModal.value = true
}

// 关闭弹窗
const close = () => {
  showModal.value = false;
  clearForm();
  appsStore.getTableList(); // 刷新列表
}

// 清空表单
const clearForm = () => {
  form.value = {
    name: '',
    desc: '',
    version: '',
    downloadUrl: '',
    status: true,
  };
}

// 创建或更新
const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      appsStore.createOrUpdateApp(form.value)
    } else {
      window.$message.error('表单验证失败');
    }
  });
}

// 暴露函数到父组件
defineExpose({
  open,
  close
})
</script>

<template>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>{{ title }}</div>
    </template>
    <div>
      <n-form :model="form" :rules="rules" ref="formRef" label-width="auto">
        <n-form-item label="应用名称" path="name">
          <n-input v-model:value="form.name" placeholder="请输入应用名称" />
        </n-form-item>
        <n-form-item label="应用版本" path="version">
          <n-input v-model:value="form.version" placeholder="请输入应用版本" />
        </n-form-item>
        <n-form-item label="下载地址" path="downloadUrl">
          <n-input v-model:value="form.downloadUrl" placeholder="请输入应用下载地址" />
        </n-form-item>
        <n-form-item label="应用描述" path="desc">
          <n-input v-model:value="form.desc" type="textarea" placeholder="请输入应用描述" :autosize="{
            minRows: 3,
            maxRows: 5,
          }" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <div>
        <n-flex>
          <n-button size="small" :loading="appsStore.loading" @click="close">取消</n-button>
          <n-button type="primary" size="small" :loading="appsStore.loading" @click="handleSubmit">确定</n-button>
        </n-flex>
      </div>
    </template>
  </n-modal>
</template>
