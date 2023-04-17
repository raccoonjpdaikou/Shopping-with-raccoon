import React from "react";
import {
  IoSearch,
  IoCalculator,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";

export const navDataLink = [
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
];
export const navDataBtn = [
  {
    title: "費用估計",
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
];
