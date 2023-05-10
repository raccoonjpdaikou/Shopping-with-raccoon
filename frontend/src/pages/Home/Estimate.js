//匯率需要從後台改
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import GuestService from "../../services/guest.service";
import Footer from "../../components/Footer";

const Estimate = () => {
  const [total, setTotal] = useState("");
  const [rate, setRate] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: { serviceFee: 100 },
  });

  const sumHandler = (data) => {
    setTotal(
      ((data.price ? data.price : 0) +
        (data.deliveryFee ? data.deliveryFee : 0)) *
        rate +
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
                  <li>
                    <p>
                      同時委託的多項商品都可以算一筆委託手續費100元（5個賣場或網站以內），每多5個賣場或網站則會另外產生50元手續費
                    </p>
                    <p>
                      ex.同時委託5個mercari賣場，委託手續費是100元，6~10個賣場是100+50=150元，11~15個賣場是100+50+50=200元，以此類推
                    </p>
                    <p>
                      ex.同時委託同一個網站內的15項商品，委託收續費是100元；同時委託6個不同網站的商品，則委託收續費是100+50=150元
                    </p>
                  </li>
                  <li>
                    <p>
                      每日匯率適用到下一個營業日的早上8:59，超過時間則匯率會更改，報價也會不同喔！
                    </p>
                  </li>
                  <li>
                    <p>
                      單次委託的商品總額（日幣）低於1500日幣時，會另外加收手續費50元
                    </p>
                  </li>
                  <li>
                    <p>加成過後的報價總額（台幣）會無條件進位</p>
                  </li>
                  <li>
                    <p>
                      此報價系統只能計算可刷卡之普通商品通販網站的報價，其他支付方式、或香水等特殊商品，會產生其他費用
                    </p>
                  </li>
                  <li>
                    <p>
                      此報價系統僅供參考，正確報價還是以浣熊告知的金額為準喔！
                    </p>
                  </li>
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
                    商品含稅日幣
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
                    境內運費日幣
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
                    type="number"
                    className="form-control"
                    value={rate}
                    aria-describedby="ExchangeRateHelp"
                    disabled
                  />
                  <div id="ExchangeRateHelp" className="form-text">
                    <p>代購匯率為上方顯示匯率+0.055</p>
                  </div>
                </div>
                <div className="estimate-cal-input">
                  <label htmlFor="serviceFee" className="form-label">
                    代購服務費
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

                <label className="form-label">預估總金額</label>
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
