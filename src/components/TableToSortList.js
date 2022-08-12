import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  accTradePriceSortAtom,
  isKorAtom,
  prevClosingPriceSortAtom,
  tradePriceSortAtom,
} from "../lib/util";

const TableToSortListBlock = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    height: 30px;
    background-color: #f9fafc;
    color: #666;
    padding: 0;
    font-size: 11px;
    a {
      color: #666;
      text-decoration: none;
      img {
        vertical-align: middle;
        margin-left: 3px;
      }
    }
  }
`;

const TableToSortList = ({
  sortByTradePrice,
  sortByPrevClosingPrice,
  sortByAccTradePrice,
}) => {
  const ORIGIN =
    "https://cdn.upbit.com/upbit-web/images/ico_up_down.1add58d.png";
  const DESCENDING =
    "https://cdn.upbit.com/upbit-web/images/ico_up_down_2.80e5420.png";
  const ASCENDING =
    "https://cdn.upbit.com/upbit-web/images/ico_up_down_1.af5ac5a.png";

  const [isKor, reverseLang] = useAtom(isKorAtom);
  const [tradePriceSort] = useAtom(tradePriceSortAtom);
  const [prevClosingPriceSort] = useAtom(prevClosingPriceSortAtom);
  const [accTradePriceSort] = useAtom(accTradePriceSortAtom);

  const changeLang = useCallback(
    () => reverseLang(!isKor),
    [isKor, reverseLang]
  );
  const onClick = () => {
    changeLang();
  };

  return (
    <TableToSortListBlock>
      <colgroup>
        <col width="26" />
        <col width="26" />
        <col width="94" />
        <col width="88" />
        <col width="78" />
        <col width="*" />
      </colgroup>
      <thead>
        <tr>
          <th colSpan="3">
            <Link to="#" onClick={onClick}>
              {isKor ? "한글명" : "영문명"}
              <img
                src="https://cdn.upbit.com/upbit-web/images/ico_change.c6ad0e9.png"
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#" onClick={sortByTradePrice}>
              현재가
              <img
                src={
                  tradePriceSort
                    ? tradePriceSort === "ascending"
                      ? ASCENDING
                      : DESCENDING
                    : ORIGIN
                }
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#" onClick={sortByPrevClosingPrice}>
              전일대비
              <img
                src={
                  prevClosingPriceSort
                    ? prevClosingPriceSort === "ascending"
                      ? ASCENDING
                      : DESCENDING
                    : ORIGIN
                }
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#" onClick={sortByAccTradePrice}>
              거래대금
              <img
                src={
                  accTradePriceSort
                    ? accTradePriceSort === "ascending"
                      ? ASCENDING
                      : DESCENDING
                    : ORIGIN
                }
                alt="화살표"
              />
            </Link>
          </th>
        </tr>
      </thead>
    </TableToSortListBlock>
  );
};

export default React.memo(TableToSortList);
