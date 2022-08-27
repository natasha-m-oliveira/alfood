import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const params = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`,
        )
        .then((res) => setNomeRestaurante(res.data.nome))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params]);
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurante
      </Typography>
      <Box component="form" sx={{ marginTop: 2 }} onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="standard"
          fullWidth
          value={nomeRestaurante}
          required
          onChange={(e) => setNomeRestaurante(e.target.value)}
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
