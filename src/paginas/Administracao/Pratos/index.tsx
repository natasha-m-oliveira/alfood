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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const excluirPrato = (pratoAhSerExcluido: IPrato) => {
    http
      .delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        setPratos((pratos) =>
          pratos.filter((prato) => prato.id !== pratoAhSerExcluido.id),
        );
        alert('Prato excluído com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    http
      .get('pratos/')
      .then((res) => setPratos(res.data))
      .catch((err) => {
        console.log(err);
      });
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
                <Link href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver imagem
                </Link>
              </TableCell>
              <TableCell>
                <Button variant="text">
                  <RouterLink to={`/admin/pratos/${prato.id}`}>
                    Editar
                  </RouterLink>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirPrato(prato)}
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
