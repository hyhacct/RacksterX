<script setup>
import { ref, defineExpose, defineProps } from 'vue'
import { codeType } from '@/constants/codeType';
import { useStoreCode } from '@/store/modules/code';

const formRef = ref(null);
const showModal = ref(false);
const codeStore = useStoreCode();
const form = ref({
  number: null,
  type: null,
  uuid: null,
  prefix: '',
})

// 打开弹窗
const open = () => {
  clearForm();
  showModal.value = true
}

// 关闭弹窗
const close = () => {
  showModal.value = false;
  clearForm();
}

// 清空表单
const clearForm = () => {
  form.value = {
    number: '',
    type: null,
    uuid: null,
    prefix: '',
  };
}

// 创建或更新
const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      codeStore.createCode(form.value)
      window.$message.success('卡密生成成功');
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
      <div>添加卡密</div>
    </template>
    <div>
      <n-form :model="form" ref="formRef" label-width="100px" label-placement="left">
        <n-form-item label="生成数量" path="number">
          <n-input-number v-model:value="form.number" placeholder="请输入生成数量" clearable :style="{ width: '100%' }"
            :min="1" :max="1000" />
        </n-form-item>
        <n-form-item label="时长" path="type">
          <n-select v-model:value="form.type" placeholder="选择时长" :options="codeType.type" />
        </n-form-item>
        <n-form-item label="应用" path="uuid">
          <n-select v-model:value="form.uuid" placeholder="请输入应用UUID" :options="codeStore.appsOptions"
            @focus="codeStore.getAppsPerview" />
        </n-form-item>
        <n-form-item label="卡密前缀" path="prefix">
          <n-input v-model:value="form.prefix" placeholder="请输入自定义前缀" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <div>
        <n-flex>
          <n-button size="small" :loading="codeStore.loading" @click="close">取消</n-button>
          <n-button type="primary" size="small" :loading="codeStore.loading" @click="handleSubmit">确定</n-button>
        </n-flex>
      </div>
    </template>
  </n-modal>
</template>
