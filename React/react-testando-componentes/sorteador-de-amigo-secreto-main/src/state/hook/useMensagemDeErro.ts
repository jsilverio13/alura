import { useRecoilValue } from "recoil";
import { erroState } from "../atom";

export const useMensagemDeErro = () => {
  return useRecoilValue(erroState);
};
