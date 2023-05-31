import React from "react";
const faqData = [
  {
    question: "我想要使用噗浪委託小浣熊，為什麼無法私噗給小浣熊呢？",
    answer:
      "小浣熊的私噗是不開放的，如果有委託需求，請至特定噗文留言或是代購噗直接留言，小浣熊看到就會私噗給您了，其他有提供臉書粉絲專頁平台可私訊詢問。",
  },
  {
    question: "請問是否可以使用無卡匯款？",
    answer: "很抱歉，自2023年03月起，不接受無卡存款當作付款方式。",
  },
  {
    question: "請問小浣熊有幫忙代匯款日幣的服務嗎？",
    answer: "很抱歉，目前服務範疇只有幫忙代購商品，無法幫忙代匯日幣喔！",
  },
  {
    question:
      "我可以請浣熊幫忙訂購商品，請浣熊寄到我的日本朋友家或是別的轉運倉地址嗎？",
    answer: "無法幫忙，請見諒。",
  },
  {
    question: "退款時需要手續費嗎？",
    answer:
      "收取退款帳號若為中國信託銀行、中華郵政以外帳號，皆會扣除轉帳手續費退款。手續費為10～15元不等。",
  },
  {
    question: "請問小浣熊有什麼商品／服務無法幫忙代購或幫助呢？",
    answer:
      "一般國際禁運品、單獨代收包裹、單獨日幣代匯款、代付款、醫藥用品代購（含隱形眼鏡）、需冷藏／冷凍配送的商品、全額取貨付款、搶購商品。※可代購香水、無線耳機等，有額外收費。",
  },
  {
    question: "請問是否有網購七天鑑賞期？",
    answer:
      "本代購服務屬於客製化代訂給付服務，不適用七日鑑賞期，無法退換貨、退費，敬請見諒。",
  },
  {
    question: "委託小浣熊在推特上交易，如果遇到賣家詐騙或是商品不實怎麼辦？",
    answer:
      "購買推特上私人讓出的周邊時，由於不是透過有保障的交易平台交易，需謹慎小心選擇賣家。因為賣家遠在海外，無法幫忙海外提告或是報警申訴處理，賠償或是退款也是沒有辦法的。交易前小浣熊也會幫忙再三確認是否為有問題的帳號喔！",
  },
  {
    question: "購買Mercari日拍若收到的商品為贗品怎麼辦？",
    answer:
      "這部分恕小浣熊無法負擔任何賠償責任，若有需要提前確認商品資訊、詳細圖片，請確認購買之前向小浣熊提出，如果需要收到商品馬上可以做確認該商品是否符合賣場說明，請告訴浣熊要另外運送到其他倉庫。（會有另外的代收費用）",
  },
  {
    question: "商品外包裝若有損傷，可否提供賠償？",
    answer:
      "物流運送等有一定風險，若只是外包裝有損毀瑕疵、內容物無任何影響等案件，不在浣熊的賠償範疇內，請提前了解購買的是內容物，並非外包裝。",
  },
];
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
const faqComponent = () => {
  return (
    <div className="homepage-section-layout" id="faq">
      <h2>常見問與答</h2>
      <div className="faq-content homepage-content-layout">
        {faqData.map((content, i) => (
          <div key={i}>
            <Faq question={content.question} answer={content.answer} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default faqComponent;
