import { InvitationApp } from "@/components/invitation/invitation-app";
import AdminPage from "@/routes/admin";

function App() {
  // Roteamento simples baseado no pathname
  const path = window.location.pathname;
  
  // Remove o base path se estiver em produção
  const cleanPath = path.replace("/niver", "");

  if (cleanPath === "/admin") {
    return <AdminPage />;
  }

  return <InvitationApp />;
}

export default App;
