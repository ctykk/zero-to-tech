import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import TextLabPage from "./components/TextLabPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/text-lab" element={<TextLabPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
