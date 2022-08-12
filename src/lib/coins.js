import { atom } from "jotai";

export const coinsAtom = atom(null);
export const updateCoinsAtom = atom(null, (get, set, arg) =>
  set(coinsAtom, arg)
);
export const marketsAtom = atom(null);
export const updateMarketsAtom = atom(null, (get, set, arg) =>
  set(marketsAtom, arg)
);
