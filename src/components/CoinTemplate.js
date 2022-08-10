import axios from "axios";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { coinsAtom, marketsAtom } from "../lib/coins";
import {
  accTradePriceSortAtom,
  prevClosingPriceSortAtom,
  tradePriceSortAtom,
} from "../lib/util";
import CoinList from "./CoinList";
import Header from "./Header";
import TableToSortList from "./TableToSortList";

const CoinTemplateBlock = styled.div`
  width: 400px;
  border: 1px solid #d4d6dc;
  margin: 10px auto;
`;

const CoinTemplate = () => {
  const [markets, setMarkets] = useAtom(marketsAtom);
  const [coins, setCoins] = useAtom(coinsAtom);
  const [tradePriceSort, setTradePriceSort] = useAtom(tradePriceSortAtom);
  const [prevClosingPriceSort, setPrevClosingPriceSort] = useAtom(
    prevClosingPriceSortAtom
  );
  const [accTradePriceSort, setAccTradePriceSort] = useAtom(
    accTradePriceSortAtom
  );

  const [firstSort, setFirstSort] = useState(true);
  const [, setLoading] = useState(false);

  const getMarkets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("../v1/market/all");
      setMarkets(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [setMarkets]);

  /*
  const setSubMarkets = useCallback(
    (markets) => {
      setKrwMarkets(markets.filter(({ market }) => market.startsWith("KRW")));
      setBtcMarkets(markets.filter(({ market }) => market.startsWith("BTC")));
      setUsdtMarkets(markets.filter(({ market }) => market.startsWith("USDT")));
    },
    [setKrwMarkets, setBtcMarkets, setUsdtMarkets]
  );
    */

  const getCoins = useCallback(async () => {
    setLoading(true);
    let params = markets.map(({ market }) => market).join(",");
    try {
      const response = await axios.get(`../v1/ticker?markets=${params}`);
      setCoins(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [setCoins, markets]);

  const sortByTradePrice = () => {
    if (tradePriceSort) {
      if (tradePriceSort === "ascending") {
        setTradePriceSort("descending");
        coins.sort((a, b) => b.trade_price - a.trade_price);
      } else {
        setTradePriceSort("ascending");
        coins.sort((a, b) => a.trade_price - b.trade_price);
      }
    } else {
      setPrevClosingPriceSort(null);
      setAccTradePriceSort(null);
      setTradePriceSort("descending");
      coins.sort((a, b) => b.trade_price - a.trade_price);
    }
  };
  const sortByPrevClosingPrice = () => {
    if (prevClosingPriceSort) {
      if (prevClosingPriceSort === "ascending") {
        setPrevClosingPriceSort("descending");
        coins.sort((a, b) => b.signed_change_rate - a.signed_change_rate);
      } else {
        setPrevClosingPriceSort("ascending");
        coins.sort((a, b) => a.signed_change_rate - b.signed_change_rate);
      }
    } else {
      setTradePriceSort(null);
      setAccTradePriceSort(null);
      setPrevClosingPriceSort("descending");
      coins.sort((a, b) => b.signed_change_rate - a.signed_change_rate);
    }
  };
  const sortByAccTradePrice = () => {
    if (accTradePriceSort) {
      if (accTradePriceSort === "ascending") {
        setAccTradePriceSort("descending");
        coins.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
      } else {
        setAccTradePriceSort("ascending");
        coins.sort((a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h);
      }
    } else {
      setTradePriceSort(null);
      setPrevClosingPriceSort(null);
      setAccTradePriceSort("descending");
      coins.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
    }
  };

  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  /*
  useEffect(() => {
    if (markets) {
      setSubMarkets(markets);
    }
  }, [markets, setSubMarkets]);
  */

  useEffect(() => {
    if (markets) {
      getCoins();
    }
  }, [markets, getCoins]);

  useEffect(() => {
    if (firstSort && coins) {
      setFirstSort(false);
      coins.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
    }
  }, [firstSort, setFirstSort, coins]);

  return (
    <CoinTemplateBlock>
      <Header />
      <TableToSortList
        sortByTradePrice={sortByTradePrice}
        sortByPrevClosingPrice={sortByPrevClosingPrice}
        sortByAccTradePrice={sortByAccTradePrice}
      />
      {coins ? (
        <Routes>
          <Route
            path="/"
            element={
              <CoinList
                coins={coins.filter(({ market }) => market.startsWith("KRW"))}
              />
            }
          />
          <Route
            path="/BTC"
            element={
              <CoinList
                coins={coins.filter(({ market }) => market.startsWith("BTC"))}
              />
            }
          />
          <Route
            path="/USDT"
            element={
              <CoinList
                coins={coins.filter(({ market }) => market.startsWith("USDT"))}
              />
            }
          />
        </Routes>
      ) : (
        <div>loading...</div>
      )}
    </CoinTemplateBlock>
  );
};

export default CoinTemplate;
