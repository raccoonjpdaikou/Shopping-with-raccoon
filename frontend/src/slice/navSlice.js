import { createSlice } from "@reduxjs/toolkit";
import {
  IoSearch,
  IoCalculator,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";

export const navSlice = createSlice({
  name: "nav",
  initialState: [
    {
      Link: [
        {
          title: "公告區",
          path: "announcements",
        },
        {
          title: "代購流程",
          path: "how",
        },
        {
          title: "收費方式",
          path: "fee",
        },
        {
          title: "代購規則",
          path: "rule",
        },
        {
          title: "常見問與答",
          path: "faq",
        },
      ],
      Btn: [
        {
          title: "費用估價",
          path: "estimate",
          icon: <IoCalculator />,
        },
        {
          title: "訂單查詢",
          path: "orders",
          icon: <IoSearch />,
        },
        {
          title: "留言板",
          path: "comments",
          icon: <IoChatboxEllipsesOutline />,
        },
      ],
    },
  ],
});

export default navSlice.reducer;
