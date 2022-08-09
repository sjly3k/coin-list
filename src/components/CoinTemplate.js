import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CoinList from "./CoinList";
import Header from "./Header";
import TableToSortList from "./TableToSortList";

const CoinTemplateBlock = styled.div`
  width: 400px;
  border: 1px solid #d4d6dc;
  margin: 10px auto;
`;

const CoinTemplate = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMarkets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.upbit.com/v1/market/all");
      setMarkets(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [setMarkets]);

  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  return (
    <CoinTemplateBlock>
      <Header />
      <TableToSortList />
      <CoinList markets={markets} />
    </CoinTemplateBlock>
  );
};

export default CoinTemplate;
