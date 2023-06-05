import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slice/navSlice";
import privacyReducer from "./slice/privacySlice";
import serviceReducer from "./slice/serviceSlice";
import estimateReducer from "./slice/estimateSlice";
import faqReducer from "./slice/faqSlice";
import feeReducer from "./slice/feeSlice";
import ruleReducer from "./slice/ruleSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    estimate: estimateReducer,
    privacy: privacyReducer,
    service: serviceReducer,
    faq: faqReducer,
    fee: feeReducer,
    rule: ruleReducer,
  },
});
