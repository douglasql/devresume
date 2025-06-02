import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Classic from './pages/Preview';

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/preview" element={<Classic />} />
    </Routes>
  );
};

export default RouteComponent;