export const codeType = {
  type: [
    {
      label: "1小时",
      value: 1,
    },
    {
      label: "12小时",
      value: 12,
    },
    {
      label: "1天",
      value: 24,
    },
    {
      label: "3天",
      value: 72,
    },
    {
      label: "7天",
      value: 168,
    },
    {
      label: "30天",
      value: 720,
    },
    {
      label: "90天",
      value: 2160,
    },
    {
      label: "180天",
      value: 4320,
    },
    {
      label: "360天",
      value: 8760,
    },
    {
      label: "永久",
      value: 87600, // 10年
    },
  ],
};

// 根据时长响应字符串
export const typeToStr = (type: number) => {
  const item = codeType.type.find((item) => item.value === type);
  return item ? item.label : "未知";
};
