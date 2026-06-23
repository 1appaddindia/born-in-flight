import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Framework from "@/pages/Framework";
import Programs from "@/pages/Programs";
import SuccessStories from "@/pages/SuccessStories";
import Media from "@/pages/Media";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
