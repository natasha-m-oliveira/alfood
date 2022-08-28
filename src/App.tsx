import { Routes, Route } from 'react-router-dom';
import AdministracaoPratos from './paginas/Administracao/Pratos';
import FormularioPrato from './paginas/Administracao/Pratos/Formulario';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/Formulario';
import TemplateAdmin from './paginas/Administracao/TemplateAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<TemplateAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
