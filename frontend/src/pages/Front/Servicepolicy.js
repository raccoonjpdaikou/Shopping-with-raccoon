import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
/* scss在others */
const Servicepolicy = () => {
  const ServiceDatas = useSelector((state) => {
    return state.service[0];
  });

  return (
    <div className="section container policy-layout">
      <h1>{ServiceDatas.Title}</h1>
      <h2>{ServiceDatas.Subtitle}</h2>
      <div className="policy-bg">
        <ol className="list-ch-num list-position-i">
          {ServiceDatas.Content.map((data, index) => (
            <li key={index}>
              {data.title}
              <ol className={`${data.type ? "list-position-o" : "list-none"}`}>
                {data.content.map((data) => (
                  <li key={data.id}>
                    {!data.link ? (
                      data.text
                        .split("\n")
                        .map((line, i) => <p key={data.id + i}>{line}</p>)
                    ) : (
                      <p>
                        關於顧客資料，依照小浣熊提供之「
                        <Link to="/privacy" className="policy-link">
                          隱私權政策
                        </Link>
                        」受到保護與規範。
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
      <h4>{ServiceDatas.Date}</h4>
      <div className="policy-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Servicepolicy;
