import {
  AppBar,
  Button,
  Container,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const TemplateAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Administração
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Novo Restaurante
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Pratos
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            {/* Conteúdo */}
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default TemplateAdmin;
