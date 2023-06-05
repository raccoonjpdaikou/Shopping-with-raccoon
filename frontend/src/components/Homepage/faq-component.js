import React from "react";
import { useSelector } from "react-redux";

const Faq = ({ question, answer }) => {
  return (
    <div className="faq-text">
      <div className="faq-q">
        <div className="faq-icon">
          <p className="faq-icon-text">Q</p>
        </div>
        <p>{question}</p>
      </div>
      <div className="faq-a">
        <div className="faq-icon">
          <p className="faq-icon-text">A</p>
        </div>
        <p>{answer}</p>
      </div>
      <br />
    </div>
  );
};
const FaqComponent = () => {
  const FaqDatas = useSelector((state) => {
    return state.faq;
  });
  return (
    <div className="homepage-section-layout" id="faq">
      <h2>常見問與答</h2>
      <div className="faq-content homepage-content-layout">
        {FaqDatas.map((content, i) => (
          <div key={i}>
            <Faq question={content.question} answer={content.answer} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
