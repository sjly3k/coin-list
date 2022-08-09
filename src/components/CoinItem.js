import styled, { css } from "styled-components";

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
      font-size: 13px;
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

  ${(props) =>
    props.up &&
    css`
      .price {
        strong {
          color: #c84a31;
        }
      }
      .percent {
        p,
        em {
          color: #c84a31;
        }
      }
      .cAlign {
        .bar {
          .line,
          .box {
            background-color: #c84a31;
          }
        }
      }
    `}
`;

const CoinItem = ({ ...props }) => {
  return (
    <CoinItemBlock {...props}>
      <td></td>
      <td className="cAlign">
        <div className="bar">
          <span className="line" style={{ top: 4.9132, height: 9 }}>
            -
          </span>
          <span className="box" style={{ top: 7.4132, height: 6 }}>
            -
          </span>
        </div>
      </td>
      <td className="tit">
        <strong>플로우</strong>
        <em>
          BTC<span>/{"KRW"}</span>
        </em>
      </td>
      <td className="price">
        <strong>13,000</strong>
      </td>
      <td className="percent">
        <p>+14.5%</p>
        <em>500</em>
      </td>
      <td className="rAlign">
        <p>
          380,000
          <i>백만</i>
        </p>
      </td>
    </CoinItemBlock>
  );
};

export default CoinItem;
