import { Routes, Route, Navigate } from "react-router-dom";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import CreateTicketPage from "./pages/CreateTicketPage";

function App() {
 return (
  <Routes>

    <Route path="/" element= {<Navigate to= "/tickets" replace />} />
    <Route path="/tickets" element={<TicketsPage />} />
    <Route path= "/tickets/new" element={<CreateTicketPage />}/>
    <Route path= "/tickets/:id" element={<TicketDetailPage />}/>
    <Route path="*" element= {<div style= {{padding: 24 }}>Not found</div>} />

  </Routes>
 );
}

export default App;
