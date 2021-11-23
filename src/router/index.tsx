import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../pages/Friend/Friend";
import Mine from "../pages/Mine/Mine";

const MainRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/discovery/recommend" />} />
      <Route
        path="discovery"
        element={<Navigate to="/discovery/recommend" />}
      />
      <Route path="/discovery/recommend" element={<Home />} />
      <Route path="friend" element={<Friend />} />
      <Route path="mine" element={<Mine />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </>
);

export default MainRouter;
