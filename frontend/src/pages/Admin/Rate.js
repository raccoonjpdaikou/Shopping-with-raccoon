import React, { useState, useEffect, useRef } from "react";
import GuestService from "../../services/guest.service";
import RateService from "../../services/rate.service";
import { format, parseISO } from "date-fns";

const Rate = () => {
  const [rate, setRate] = useState("");
  const [displayRate, setDisplayRate] = useState();
  const [displayTime, setDisplayTime] = useState();
  const ref = useRef();

  const change = (e) => {
    setRate(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") click();
  };
  const update = async (e) => {
    await GuestService.rate()
      .then((data) => {
        if (data.data.date === "") return;
        setDisplayRate(data.data[0].rate);
        setDisplayTime(data.data[0].date);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const click = async (e) => {
    if (rate !== "") {
      setDisplayRate(rate);
      await RateService.delete()
        .then((data) => {})
        .catch((e) => {
          console.log(e.response.data);
        });
      RateService.post(rate)
        .then((data) => {
          setRate("");
        })
        .then((data) => {
          update();
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  };

  const setFocus = () => {
    ref.current.focus();
  };

  useEffect(() => {
    setFocus();
    update();
  }, []);

  return (
    <>
      <div className="rate-layout container d-flex flex-column">
        <h2 className="rate-title d-flex justify-content-center align-items-center">
          {displayRate}
        </h2>
        <h6 className="rate-date">
          更新時間：
          {displayTime !== undefined
            ? format(parseISO(displayTime), "yyyy/MM/dd HH:mm:ss O")
            : "沒資料"}
        </h6>
        <form className="d-flex mx-auto">
          <div className="px-2">
            <label htmlFor="rate" className="visually-hidden">
              匯率
            </label>
            <input
              type="text"
              className="form-control"
              onChange={change}
              onKeyDown={handleKeyDown}
              value={rate}
              id="rate"
              ref={ref}
            />
          </div>
          <div className="px-2">
            <button
              type="button"
              onClick={click}
              className="btn btn-secondary mb-3"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Rate;
