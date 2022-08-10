import { atom } from "jotai";

export const coinsAtom = atom(null);
export const updateCoinsAtom = atom(null, (get, set, arg) =>
  set(coinsAtom, arg)
);
export const marketsAtom = atom(null);
export const updateMarketsAtom = atom(null, (get, set, arg) =>
  set(marketsAtom, arg)
);

/*
export const btcCoinsAtom = atom(null);
export const updateBtcCoinsAtom = atom(null, (get, set, arg) =>
  set(btcCoinsAtom, arg)
);
export const btcMarketsAtom = atom(null);
export const updateBtcMarketsAtom = atom(null, (get, set, arg) =>
  set(btcCoinsAtom, arg)
);

export const usdtCoinsAtom = atom(null);
export const updateUsdtCoinsAtom = atom(null, (get, set, arg) =>
  set(usdtCoinsAtom, arg)
);
export const usdtMarketsAtom = atom(null);
export const updateUsdtMarketsAtom = atom(null, (get, set, arg) =>
  set(usdtCoinsAtom, arg)
);
*/
