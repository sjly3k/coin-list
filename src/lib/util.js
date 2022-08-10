import { atom } from "jotai";

export const isKorAtom = atom(true);
export const reverseLangAtom = atom(null, (get, set, arg) =>
  set(isKorAtom, arg)
);

export const tradePriceSortAtom = atom(null);
export const setTradePriceSortAtom = atom(null, (get, set, arg) =>
  set(tradePriceSortAtom, arg)
);

export const prevClosingPriceSortAtom = atom(null);
export const setPrevClosingPriceSortAtom = atom(null, (get, set, arg) =>
  set(tradePriceSortAtom, arg)
);

export const accTradePriceSortAtom = atom("descending");
export const setAccTradePriceSortAtom = atom(null, (get, set, arg) =>
  set(tradePriceSortAtom, arg)
);
