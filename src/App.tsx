import { InvitationApp } from "@/components/invitation/invitation-app";
import AdminPage from "@/routes/admin";

function App() {
  // Roteamento simples baseado no pathname
  const path = window.location.pathname;
  
  // Normaliza o path removendo trailing slash e base
  const normalizedPath = path.replace(/\/$/, '').toLowerCase();
  
  // Verifica se termina com /admin (funciona tanto local quanto no GitHub Pages)
  if (normalizedPath.endsWith('/admin')) {
    return <AdminPage />;
  }

  return <InvitationApp />;
}

export default App;
