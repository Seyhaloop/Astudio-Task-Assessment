import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import appStyles from "./styles/globalStyle";
import { TopNav, ErrorBoundary, Footer } from "@components";
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
            <Footer />
          </div>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
