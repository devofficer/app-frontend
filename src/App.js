import UserContext from "src/context/User";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <UserContext>
      <ToastContainer />
      <Home />
    </UserContext>
  );
}

export default App;
