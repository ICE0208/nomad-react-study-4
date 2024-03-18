import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
