import axios from "axios";
import { useCallback } from "react";
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

const CoinList = ({ markets }) => {
  const getCoin = useCallback(async ({ market }) => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=${market}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
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
          <CoinItem />
        </tbody>
      </CoinTable>
    </CoinListBlock>
  );
};

export default CoinList;
