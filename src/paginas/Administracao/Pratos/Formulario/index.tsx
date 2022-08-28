import { PhotoCamera } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../../http';
import { INovoPrato } from '../../../../interfaces/INovoPrato';
import IPrato from '../../../../interfaces/IPrato';
import IRestaurante from '../../../../interfaces/IRestaurante';
import ITag from '../../../../interfaces/ITag';

const FormularioPrato = () => {
  const defaultPrato = {
    id: null,
    nome: '',
    tag: '',
    imagem: null,
    descricao: '',
    restaurante: '',
  };
  const params = useParams();
  const [prato, setPrato] = useState<INovoPrato>(defaultPrato);
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', prato.nome);
    formData.append('descricao', prato.descricao);
    formData.append('tag', prato.tag);
    formData.append('restaurante', String(prato.restaurante));
    if (prato.imagem && typeof prato.imagem !== 'string') {
      formData.append('imagem', prato.imagem);
    }
    if (params.id) {
      http
        .put(`pratos/${params.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          alert('Prato atualizado com sucesso');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      http
        .post('pratos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          setPrato(defaultPrato);
          alert('Prato cadastrado com sucesso');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (params.id) {
      http
        .get<IPrato>(`pratos/${params.id}/`)
        .then((res) => setPrato(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params]);
  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/').then((res) => {
      setTags(res.data.tags);
    });
    http.get<IRestaurante[]>('restaurantes/').then((res) => {
      setRestaurantes(res.data);
    });
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Prato
      </Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="standard"
          fullWidth
          margin="dense"
          value={prato.nome}
          required
          onChange={(e) =>
            setPrato((prato) => ({ ...prato, nome: e.target.value }))
          }
        />
        <TextField
          label="Descrição"
          variant="standard"
          fullWidth
          margin="dense"
          value={prato.descricao}
          required
          onChange={(e) =>
            setPrato((prato) => ({ ...prato, descricao: e.target.value }))
          }
        />
        <FormControl variant="standard" fullWidth margin="dense">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={prato.tag}
            onChange={(e) =>
              setPrato((prato) => ({ ...prato, tag: e.target.value }))
            }
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth margin="dense">
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={prato.restaurante}
            onChange={(e) =>
              setPrato((prato) => ({ ...prato, restaurante: e.target.value }))
            }
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          color="primary"
          aria-label="carregar foto"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) =>
              setPrato((prato) => ({
                ...prato,
                imagem: e.target.files?.length ? e.target.files[0] : null,
              }))
            }
          />
          <PhotoCamera />
        </IconButton>
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

export default FormularioPrato;
