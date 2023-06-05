import { createSlice } from "@reduxjs/toolkit";

export const feeSlice = createSlice({
  name: "fee",
  initialState: [
    {
      icon: false,
      text: "個人委託：商品日幣含稅價 ×（郵局告牌匯率＋0.055）＋100元手續費",
    },
    {
      icon: false,
      text: "空運國際運費（集運）：每100公克21～40元以上，未滿100公克以100公克計算",
    },
    {
      icon: true,
      color: "#E0973E",
      text: "香水代收：每瓶／件100元+轉運費80～150元（轉運費可與其他客人平分）",
    },
    {
      icon: true,
      color: "#7d6c46",
      text: "購買不可使用轉運倉址之商品，另收代收費：100～150元",
    },
    {
      icon: true,
      color: "#7d6c46",
      text: "未在時間內取貨遭退回，重新寄回：60元",
    },
    {
      icon: true,
      color: "#E0973E",
      text: "其他未明確標明收費之服務也會斟酌收費，會提前告知",
    },
  ],
});

export default feeSlice.reducer;
