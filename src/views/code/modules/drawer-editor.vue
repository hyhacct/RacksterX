<script setup>
import { ref, defineExpose } from "vue";
import { codeType } from "@/constants/codeType";
import { useStoreCode } from "@/store/modules/code";

const show = ref(false);
const form = ref({
  code: "",
  old_uuid: "",
  new_uuid: "",
  type: null,
  machineCode: "",
  ban: false,
  createAt: "",
  timeOut: "",
  activate: "",
});
const codeStore = useStoreCode();

const open = (row) => {
  show.value = true;
  form.value = {
    code: row.code,
    old_uuid: row.uuid,
    new_uuid: row.uuid,
    type: row.type,
    machineCode: row.machineCode,
    ban: row.ban,
    createAt: row.createAt,
    timeOut: row.timeOut,
    activate: row.activate,
  };
  codeStore.getAppsPerview(); // 获取应用预览
};

const close = () => {
  show.value = false;
};

// 保存
const handleSave = () => {
  codeStore.updateCode(form.value);
};

// 解绑
const handleUnbind = () => {
  form.value.machineCode = null;
  window.$message.success("解绑成功,保存后生效");
};

const railStyle= ({
        focused,
        checked
      }) => {
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

defineExpose({
  open,
  close,
});
</script>

<template>
  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content title="编辑卡密信息" closable>
      <n-flex vertical>
        <n-alert title="你知道吗?" type="info">
          在这里你可以为卡密进行换绑应用,解除机器码,封禁/解封等操作,但是不允许修改卡密.
          <br />
          当你做完一系列操作后,请点击保存按钮,否则修改不会生效.
        </n-alert>
        <n-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="卡密" path="code">
              <n-input v-model:value="form.code" disabled />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="绑定应用" path="new_uuid">
              <n-select
                v-model:value="form.new_uuid"
                placeholder="请选择应用"
                :options="codeStore.appsOptions"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="时长" path="type">
              <n-select
                v-model:value="form.type"
                placeholder="选择时长"
                :options="codeType.type"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="创建时间" path="createAt">
              <n-tag type="info" :bordered="false">
                {{ form.createAt }}
              </n-tag>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="到期时间" path="timeOut">
              <n-tag type="error" :bordered="false">
                {{ form.timeOut }}
              </n-tag>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="状态" path="activate">
              <n-tag :type="form.activate == '已激活' ? 'success' : 'warning'">
                {{ form.activate }}
              </n-tag>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="是否封禁" path="ban">
              <n-switch :rail-style="railStyle" v-model:value="form.ban">
                <template #checked>封禁</template>
                <template #unchecked>正常</template>
              </n-switch>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="机器码" path="machineCode">
              <n-input v-model:value="form.machineCode" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-flex>
      <template #footer>
        <n-flex>
          <n-button @click="close"> 取消 </n-button>
          <n-button type="warning" @click="handleUnbind"> 解绑 </n-button>
          <n-button type="primary" @click="handleSave"> 保存 </n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
