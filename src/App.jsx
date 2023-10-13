import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/Homepage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Normal bundle
//
// dist/assets/index-75e2276f.css   31.28 kB │ gzip:   5.21 kB
// dist/assets/index-dabb4339.js   527.17 kB │ gzip: 149.37 kB

// With lazy loading
//
// dist/index.html                           0.93 kB │ gzip:   0.52 kB
// dist/assets/Logo-81b2c976.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-b7d792c3.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-9f395e2d.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-b91bce59.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-ad7167c9.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-c27637be.css           27.61 kB │ gzip:   4.51 kB
// dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-ef69c093.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-2d97c4c7.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-a1b59c68.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-25637e18.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-0b674460.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-282ed189.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-135e1d3e.js             1.03 kB │ gzip:   0.55 kB
// dist/assets/AppLayout-a4336ad1.js       156.94 kB │ gzip:  46.11 kB
// dist/assets/index-1ed2561d.js           368.68 kB │ gzip: 102.84 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
