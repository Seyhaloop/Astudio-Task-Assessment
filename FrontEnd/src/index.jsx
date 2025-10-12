import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import appStyles from "./styles/globalStyle";
import { TopNav, ErrorBoundary } from "@components";
import { ProductsPage, UsersPage } from "@pages";
import { AppProvider } from "@context";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <div style={appStyles}>
            <TopNav />
            <main className="container-fluid">
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Routes>
            </main>
            <footer className="bg-gray-100 py-4 mt-10">
              <div className="container mx-auto text-center space-x-4">
                <a
                  href="https://github.com/yahongie2014/Astudio-Task-Assessment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-900 space-x-2 transition"
                >
                  <img
                    src="https://www.logo.wine/a/logo/GitHub/GitHub-Icon-White-Dark-Background-Logo.wine.svg"
                    alt="GitHub"
                    className="w-6 h-6"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://documenter.getpostman.com/view/2836787/2sB3QKtAm1"
                  download
                  className="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 space-x-2 transition"
                  style={{
                    backgroundColor: "#FF6C37",
                  }}
                >
                  <img
                    src="https://www.svgrepo.com/show/354202/postman-icon.svg"
                    alt="Postman"
                    className="w-6 h-6"
                    style={{
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <span>Download Postman</span>
                </a>
              </div>
            </footer>
          </div>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
