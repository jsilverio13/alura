import { ITarefa } from "../../types/tarefa";
import Item from "./item";
import style from "./lista.module.scss";

interface Props {
  tarefas: ITarefa[],
  selecionarTarefa: (tarefaSelecionada: ITarefa) => void
}

function Lista({ tarefas, selecionarTarefa: selecionaTarefa }: Props) {
  return (
    <aside className={style.listaTarefas}>
      <h2>Estudos do dia</h2>
      <ul>
        {tarefas.map((item) => (
          <Item selecionaTarefa={selecionaTarefa} key={item.id} {...item} />
        ))}
      </ul>
    </aside>
  );
}

export default Lista;
