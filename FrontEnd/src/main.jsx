import { createRoot } from "react-dom/client";
import App from "@src";
import "bootstrap/dist/css/bootstrap.min.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

export default App;
