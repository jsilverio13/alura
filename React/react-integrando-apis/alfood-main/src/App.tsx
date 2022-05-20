import { Routes, Route } from "react-router-dom";
import PaginaBaseAdmin from "./pages/Administracao/PaginaBaseAdmin";
import AdministracaoPratos from "./pages/Administracao/Pratos/AdministracaoPratos";
import FormularioPrato from "./pages/Administracao/Pratos/FormularioPratos";
import AdministracaoRestaurantes from "./pages/Administracao/Restaurantes/AdministracaoRestaurante";
import FormularioRestaurante from "./pages/Administracao/Restaurantes/FormularioRestaurante";
import Home from "./pages/Home";
import VitrineRestaurantes from "./pages/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/" element={<PaginaBaseAdmin />}>
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
