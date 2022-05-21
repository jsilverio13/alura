import { selector } from "recoil";
import { IEvento } from "../../../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../../atom";

export const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosEventos = get(listaDeEventosState);

    return todosEventos.filter((evt) => {
      if (!filtro.data) {
        return true;
      }

      return (
        filtro.data.toISOString().slice(0, 10) ===
        evt.inicio.toISOString().slice(0, 10)
      );
    });
  },
});

export const eventosAsync = selector({
  key: "eventosAsync",
  get: async () => {
    const response = await fetch("http://localhost:9999/eventos");
    const eventosJson: IEvento[] = await response.json();
    return eventosJson.map((evento) => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }));
  },
});
