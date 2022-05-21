import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const excluir = (pratoExcluir: IPrato) => {
    http.delete(`pratos/${pratoExcluir.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoExcluir.id
      );
      setPratos([...listaPratos]);
    });
  };

  useEffect(() => {
    http.get("pratos/").then((response) => setPratos(response.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver Imagem
                </a>
              </TableCell>
              <TableCell>
                [
                <Link component={RouterLink} to={`/admin/pratos/${prato.id}`}>
                  Editar
                </Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
