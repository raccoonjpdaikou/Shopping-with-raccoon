import React from "react";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
/* scss在others */
const Privacy = () => {
  const PrivacyDatas = useSelector((state) => {
    return state.privacy[0];
  });
  return (
    <div className="section container privacy-layout">
      <h1>{PrivacyDatas.Title}</h1>
      <h2>{PrivacyDatas.Subtitle}</h2>
      <div className="privacy-bg">
        <ol className="list-ch-num list-position-i">
          {PrivacyDatas.Content.map((data, index) => (
            <li key={index}>
              {data.title}
              <ul>
                {data.content.map((data, i) => (
                  <li key={i} className={`${!data.type && "list-none"}`}>
                    {data.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <div className="privacy-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Privacy;
