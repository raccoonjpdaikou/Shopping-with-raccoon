//匯率需要從後台改
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import GuestService from "../../services/guest.service";
import Footer from "../../components/Footer";

const Estimate = () => {
  const EstimateRuleDatas = useSelector((state) => {
    return state.estimate;
  });
  const [total, setTotal] = useState("");
  const [rate, setRate] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: { serviceFee: 100 },
  });

  const sumHandler = (data) => {
    setTotal(
      ((data.price ? data.price : 0) +
        (data.deliveryFee ? data.deliveryFee : 0)) *
        (rate + 0.055) +
        (data.serviceFee ? data.serviceFee : 0)
    );
  };

  useEffect(() => {
    GuestService.rate()
      .then((data) => {
        setRate(data.data[0].rate);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="estimate-row">
          <div className="estimate-rule-layout">
            <div className="estimate-rule-color">
              <div className="estimate-rule-content">
                <h1 className="estimate-title">費用估價</h1>
                <ol>
                  {EstimateRuleDatas.map((rule, index) => (
                    <li key={index}>
                      {rule.content.map((content, index2) => (
                        <p key={index * 10 + index2}>{content}</p>
                      ))}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="estimate-footer d-none d-lg-block">
              <Footer />
            </div>
          </div>

          <div className="estimate-cal-layout">
            <div className="estimate-cal-color">
              <form onSubmit={handleSubmit(sumHandler)}>
                <div className="estimate-cal-input">
                  <label htmlFor="price" className="form-label">
                    商品含稅金額(日幣)
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="form-control"
                    {...register("price", { valueAsNumber: true })}
                  />
                </div>
                <div className="estimate-cal-input">
                  <label htmlFor="deliveryFee" className="form-label">
                    境內運費(日幣)
                  </label>
                  <input
                    id="deliveryFee"
                    type="number"
                    className="form-control"
                    {...register("deliveryFee", { valueAsNumber: true })}
                  />
                </div>
                <div className="estimate-cal-input">
                  <label htmlFor="exrate" className="form-label">
                    匯率
                  </label>
                  <input
                    id="exrate"
                    type="text"
                    className="form-control"
                    value={rate + " + 0.055"}
                    aria-describedby="ExchangeRateHelp"
                    disabled
                  />
                </div>
                <div className="estimate-cal-input">
                  <label htmlFor="serviceFee" className="form-label">
                    代購服務費(台幣)
                  </label>
                  <input
                    id="serviceFee"
                    type="number"
                    className="form-control"
                    {...register("serviceFee", { valueAsNumber: true })}
                  />
                </div>
                <div className="text-end estimate-cal-btn">
                  <button type="submit" className="btn btn-secondary">
                    費用估算
                  </button>
                </div>

                <label className="form-label">預估總金額(台幣)</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="TotalHelp"
                  placeholder={total}
                  disabled
                />
                <div id="TotalHelp" className="form-text">
                  <p>※此報價不含國際運費、台灣國內運費</p>
                </div>
              </form>
            </div>
          </div>
          <div className="estimate-footer mb-4 d-block d-lg-none ">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Estimate;
