import React, { useState, useEffect } from 'react'

export default function Book(props) {
  const [trades, setTrades] = useState([/*{
    Id: 1,
    BookId: 1,
    CounterpartyId: 1,
    SecurityId: 1,
    Quantity: 1,
    Status: "Not completed",
    Price: 1000,
    Buy_Sell: "Buy",
    TradeDate: "2022-05-22",
    SettlementDate: null,
    security: {
      Id: 1,
      ISIN: "US2039032903",
      CUSIP: "2892379838",
      Issuer: "Issuer A",
      MaturityDate: "2023-03-22",
      FaceValue: 200,
      Coupon: 5,
      Status: "Active",
      Type: "Stock"
    }
  },
  {
    Id: 2,
    BookId: 1,
    CounterpartyId: 1,
    SecurityId: 1,
    Quantity: 1,
    Status: "Completed",
    Price: 500,
    Buy_Sell: "Buy",
    TradeDate: "2022-05-22",
    SettlementDate: "2023-09-08",
    security: {
      Id: 2,
      ISIN: "US2039042903",
      CUSIP: "2892373838",
      Issuer: "Issuer B",
      MaturityDate: "2023-05-22",
      FaceValue: 200,
      Coupon: 5,
      Status: "Active",
      Type: "Stock"
    }
  }*/
])

  const statusList = {
    "Active": {
      "icon": "rotate_left",
      "color": "yellow"
    },
    "Settled": {
      "icon": "done",
      "color": "rgb(18, 219, 18)"
    }
  }

  useEffect(() => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://16.171.26.117:8000/api/v1/booktradeid?id=" + props.book.id , false);
    request.send();
    var json = JSON.parse(request.responseText);
    setTrades(json)
  }, [])

  return (
    <div>
    <div className="book" style={{minWidth: "100%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "0px 30px", borderRadius: "10px", paddingBottom: "20px", marginBottom:"40px"}}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <h4 className="pf" style={{paddingTop: "20px", paddingBottom: "30px"}}>{props.book.BookName}</h4>
        {
            trades.map((trade) => 
            <div className="ops" style={{ display: "flex", minWidth: "100%", marginTop: "20px", boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', padding: '20px', textAlign: "left"}}>
                <div className='trade' style={{width: "50%", display: "flex" }}>
                    <div className='columna' style={{width: "50%"}}>
                        <h5>Trade Id: {trade.Id}</h5>
                        <h6>Quantity: {trade.Quantity}</h6>
                        <h6>Trade Date: {trade.TradeDate}</h6>
                        <h6>SettlementDate: {trade.SettlementDate? trade.SettlementDate : "-"}</h6>
                    </div>
                    <div className='columnb' style={{width: "50%", paddingLeft: "5px"}}>
                        <h5>Status: {trade.Status === "Completed" ? <span style={{fontSize: "1rem"}} ><span class="material-symbols-outlined" style={{color: "rgb(18, 219, 18)", fontSize: "1.1rem", fontWeight: "bold"}}>done</span>{trade.Status}</span>
                        :<span style={{fontSize: "1rem"}}><span class="material-symbols-outlined" style={{color: "red", fontSize: "1.1rem", fontWeight: "bold"}}>
                        pending
                        </span>{trade.Status}</span>}
                        </h5>
                        <h6>Price: {trade.Price}</h6>
                        <h6>Counterparty: {trade.CounterpartyId}</h6>
                        <h6>Type: {trade.Buy_Sell}</h6>
                    </div>
                </div>
                <div className='security' style={{width: "50%", display: "flex", borderLeft: "solid thin rgba(0, 0, 0, 0.2)", paddingLeft: "20px"}}>
                    <div className='columna' style={{width: "50%"}}>
                        <h5>ISIN: {trade.Security.ISIN}</h5>
                        <h6>FaceValue: {trade.Security.FaceValue}</h6>
                        <h6>CUSIP: {trade.Security.CUSIP}</h6>
                        <h6>MaturityDate: {trade.Security.MaturityDate}</h6>
                    </div>
                    <div className='columnb' style={{width: "50%", paddingLeft: "5px"}}>
                        <h5>Status: <span style={{fontSize: "1rem"}}><span class="material-symbols-outlined" style={{color: trade.Security.Status == "Active" ? "#A68210" : 
                        (trade.Security.Status == "Settled" ? "rgb(18, 219, 18)" : 
                        (trade.Security.Status == "PostMaturity" ? "red" : "blue"))  , fontSize: "1.1rem", fontWeight: "bold"}}>{trade.Security.Status == "Active" ? "rotate_left" : 
                        (trade.Security.Status == "Settled" ? "done" : 
                        (trade.Security.Status == "PostMaturity" ? "error" : "keyboard_double_arrow_right"))  }</span>{trade.Security.Status}</span>
                        </h5>
                        <h6>Coupon: {trade.Security.Coupon}</h6>
                        <h6>Issuer: {trade.Security.Issuer}</h6>
                        <h6>Type: {trade.Security.Type}</h6>
                    </div>
                </div>
            </div>)
        }
    </div>
    </div>
  )
}
