import { useAtom } from "jotai";
import styled, { css } from "styled-components";
import { krwMarketsAtom, marketsAtom } from "../lib/coins";
import { isKorAtom } from "../lib/util";

const CoinItemBlock = styled.tr`
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
      i {
        font-style: normal;
        color: #999;
      }
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

const CoinItem = ({ coin }) => {
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

  return (
    <CoinItemBlock change={change}>
      <td></td>
      <td className="cAlign">
        <div className="bar">
          <span className="line">-</span>
          <span className="box">-</span>
        </div>
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
          {trade_price >= 100.0
            ? Math.trunc(trade_price).toLocaleString("ko-KR")
            : trade_price.toFixed(2)}
        </strong>
      </td>
      <td className="percent">
        <p>
          {signed_change_rate >= 0
            ? "+" + (signed_change_rate * 100).toFixed(2)
            : (signed_change_rate * 100).toFixed(2)}
          %
        </p>
        <em>{signed_change_price.toLocaleString("ko-KR")}</em>
      </td>
      <td className="rAlign">
        <p>
          {Math.trunc(acc_trade_price_24h).toLocaleString("ko-KR").slice(0, -8)}
          <i>백만</i>
        </p>
      </td>
    </CoinItemBlock>
  );
};

export default CoinItem;
