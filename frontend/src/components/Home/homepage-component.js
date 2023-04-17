import React, { useState, useEffect } from "react";
import { homeTitleData } from "./home-data";

const InfoSection = ({ id, title, content }) => {
  return (
    <>
      <div className="section element" id={id}>
        <h2>{title}</h2>
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    </>
  );
};

const HomepageComponent = () => {
  return (
    <div className="container">
      {homeTitleData.map((item, index) => (
        <InfoSection
          id={item.id}
          title={item.title}
          content={item.content}
          key={index}
        />
      ))}
    </div>
  );
};

export default HomepageComponent;
