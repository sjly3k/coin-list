import { useAtom } from "jotai";
import React from "react";
import styled, { css } from "styled-components";
import { marketsAtom } from "../lib/coins";
import { isKorAtom } from "../lib/util";

const CoinItemBlock = styled.tr`
  i {
    font-style: normal;
    color: #999;
  }
  em {
    font-style: normal;
    display: block;
    font-size: 10px;
  }
  p {
    text-align: right;
    padding-top: 9px;
    margin: 0;
    font-size: 12px;
    font-weight: 600;
  }
  td {
    height: 44px;
    border-top: 1px solid #f1f1f4;
    padding: 0;
    text-align: right;
  }

  td:first-child {
    padding-left: 14px;
  }
  .cAlign {
    text-align: center;
    .bar {
      position: relative;
      width: 7px;
      height: 27px;
      margin: 0 auto;
      overflow: hidden;

      .line,
      .box {
        position: absolute;
        display: block;
        background-color: #333;
        overflow: hidden;
        text-indent: -999em;
      }
      .line {
        left: 3px;
        width: 1px;
      }
      .box {
        left: 0;
        width: 7px;
      }
    }
  }
  .tit {
    text-align: left;
    strong {
      font-size: 12px;
      word-break: break-all;
      display: block;
      margin: 2px 0 3px;
      line-height: 1em;
      font-weight: 700;
    }
    em {
      color: #666;
    }
  }
  .price {
    position: relative;
    padding-right: 4px;
    vertical-align: top;
    font-size: 11px;
    strong {
      font-size: 12px;
      display: block;
      padding-top: 7px;
      line-height: 1.5em;
      font-weight: 700;
    }
    em {
      color: #5c5c5c;
    }
  }
  .percent {
    vertical-align: top;
  }
  .rAlign {
    padding-right: 10px;
    text-align: right;
    vertical-align: top;
    p {
      font-size: 12px;
      font-weight: 500;
    }
    em {
      color: #5c5c5c;
      margin-top: 2px;
    }
  }

  ${({ change }) =>
    change &&
    css`
      .price {
        strong {
          color: ${colors[change].color};
        }
      }
      .percent {
        p,
        em {
          color: ${colors[change].color};
        }
      }
      .cAlign {
        .bar {
          .line,
          .box {
            background-color: ${colors[change].color};
          }
        }
      }
    `}
`;

const colors = {
  EVEN: {
    color: "#333",
  },
  RISE: {
    color: "#c84a31",
  },
  FALL: {
    color: "#1261c4",
  },
};

const CoinItem = ({ coin, price }) => {
  const {
    change,
    market,
    opening_price,
    high_price,
    low_price,
    trade_price,
    prev_closing_price,
    signed_change_price,
    signed_change_rate,
    acc_trade_price_24h,
  } = coin;

  const [markets] = useAtom(marketsAtom);
  const [isKor] = useAtom(isKorAtom);

  const krwPrice = trade_price * price;
  const accPrice = acc_trade_price_24h * price;

  return (
    <CoinItemBlock change={change}>
      <td></td>
      <td className="cAlign">
        {change === "FALL" ? (
          <div className="bar">
            <span
              className="line"
              style={{
                top:
                  (13.5 * (2 * prev_closing_price - high_price)) /
                  prev_closing_price,
                height: (13.5 * (high_price - low_price)) / prev_closing_price,
              }}
            >
              -
            </span>
            <span
              className="box"
              style={{
                top:
                  (13.5 * (2 * prev_closing_price - opening_price)) /
                  prev_closing_price,
                height:
                  (13.5 * (opening_price - trade_price)) / prev_closing_price,
              }}
            >
              -
            </span>
          </div>
        ) : (
          <div className="bar">
            <span
              className="line"
              style={{
                top:
                  (13.5 * (2 * prev_closing_price - high_price)) /
                  prev_closing_price,
                height: (13.5 * (high_price - low_price)) / prev_closing_price,
              }}
            >
              -
            </span>
            <span
              className="box"
              style={{
                top:
                  (13.5 * (2 * prev_closing_price - trade_price)) /
                  prev_closing_price,
                height:
                  (13.5 * (trade_price - opening_price)) / prev_closing_price,
              }}
            >
              -
            </span>
          </div>
        )}
      </td>
      <td className="tit">
        <strong>
          {isKor
            ? markets.find((el) => el.market === market).korean_name
            : markets.find((el) => el.market === market).english_name}
        </strong>
        <em>
          {market.split("-")[1]}
          <span>/{market.split("-")[0]}</span>
        </em>
      </td>
      <td className="price">
        <strong>
          {market.startsWith("KRW")
            ? trade_price >= 100.0
              ? Math.trunc(trade_price).toLocaleString("ko-KR")
              : trade_price.toFixed(2)
            : market.startsWith("BTC")
            ? trade_price.toFixed(8)
            : trade_price.toFixed(3).toLocaleString("ko-KR")}
        </strong>
        {market.startsWith("KRW") ? null : (
          <em>
            {krwPrice >= 100.0
              ? Math.trunc(krwPrice).toLocaleString("ko-KR")
              : krwPrice.toFixed(2)}
            <i>KRW</i>
          </em>
        )}
      </td>
      <td className="percent">
        <p>
          {signed_change_rate >= 0
            ? "+" + (signed_change_rate * 100).toFixed(2)
            : (signed_change_rate * 100).toFixed(2)}
          %
        </p>
        {market.startsWith("KRW") ? (
          <em>{signed_change_price.toLocaleString("ko-KR")}</em>
        ) : null}
      </td>
      <td className="rAlign">
        {market.startsWith("KRW") ? (
          <p>
            {Math.trunc(acc_trade_price_24h)
              .toLocaleString("ko-KR")
              .slice(0, -8)}
            <i>백만</i>
          </p>
        ) : (
          <p>{acc_trade_price_24h.toFixed(3)}</p>
        )}
        {market.startsWith("KRW") ? null : accPrice >= 1000000 ? (
          <em>
            {Math.trunc(accPrice).toLocaleString("ko-KR").slice(0, -8)}
            <i>백만</i>
          </em>
        ) : (
          <em>{Math.trunc(accPrice).toLocaleString("ko-KR")}</em>
        )}
      </td>
    </CoinItemBlock>
  );
};

export default React.memo(CoinItem);
