import React from "react";
import { useSelector } from "react-redux";

const RuleComponent = () => {
  const RuleDatas = useSelector((state) => {
    return state.rule;
  });
  return (
    <section className="homepage-section-layout" id="rule">
      <h2>代購規則</h2>
      <div className="homepage-content-layout">
        <h3>代購前請參閱下列規則及注意事項</h3>
        <ul>
          {RuleDatas.map((data, index) => (
            <li key={index}>{data.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RuleComponent;
