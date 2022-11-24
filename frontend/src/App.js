import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClients from "./pages/AddClient";
import Clients from "./pages/Clients";
import UpdateClients from "./pages/UpdateClient";
import AddExcursion from "./pages/AddExcursion";
import Excurions from "./pages/Excursions";
import UpdateExcursion from "./pages/UpdateExcursion";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/excursions" element={<Excurions />}/>
          <Route exact path="/excursions/add" element={<AddExcursion />}/> 
          <Route exact path="/excursions/update/:id" element={<UpdateExcursion />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddClients />} />
          <Route path="/clients/update/:id" element={<UpdateClients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
