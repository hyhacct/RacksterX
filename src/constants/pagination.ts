export const pagination = {
  prefix({ itemCount }: { itemCount: number }) {
    return `总计 ${itemCount} 条数据`;
  },
  pageSizes: [
    {
      label: "默认10条",
      value: 10,
    },
    {
      label: "全部显示",
      value: 9999,
    },
    {
      label: "20 每页",
      value: 20,
    },
    {
      label: "30 每页",
      value: 30,
    },
    {
      label: "40 每页",
      value: 40,
    },
  ],
  showSizePicker: true,
  displayOrder: ["quick-jumper", "pages", "size-picker"],
};
