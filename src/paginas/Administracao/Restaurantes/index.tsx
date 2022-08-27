import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const excluirRestaurante = (restauranteAhSerExcluido: IRestaurante) => {
    http
      .delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        setRestaurantes((restaurantes) =>
          restaurantes.filter(
            (restaurante) => restaurante.id !== restauranteAhSerExcluido.id,
          ),
        );
        alert('Restaurante excluído com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    http
      .get('restaurantes/')
      .then((res) => setRestaurantes(res.data))
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
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [{' '}
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>{' '}
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirRestaurante(restaurante)}
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

export default AdministracaoRestaurantes;
