import React from "react";
import styled from "styled-components";
import CoinItem from "./CoinItem";

const CoinListBlock = styled.div`
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
`;
const CoinTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CoinList = ({ coins, price }) => {
  if (!coins)
    return (
      <CoinListBlock>
        <div>loading....</div>
      </CoinListBlock>
    );
  return (
    <CoinListBlock>
      <CoinTable>
        <colgroup>
          <col width="26" />
          <col width="26" />
          <col width="94" />
          <col width="98" />
          <col width="58" />
          <col width="*" />
        </colgroup>
        <tbody>
          {coins.map((coin) => {
            return <CoinItem coin={coin} key={coin.market} price={price} />;
          })}
        </tbody>
      </CoinTable>
    </CoinListBlock>
  );
};

export default React.memo(CoinList);
