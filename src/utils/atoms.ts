import { atom } from "jotai";
import { ProductProps } from "./ProductType";
export const submitAtom = atom(false);
export const checkAtom = atom(false);
export const totalAtom = atom(0);
export const subTotalAtom = atom(0);
export const shippingCostAtom = atom(0);

export const productAtom = atom([]);
