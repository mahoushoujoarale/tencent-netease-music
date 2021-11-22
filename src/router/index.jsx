import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../pages/Friend/Friend";
import Mine from "../pages/Mine/Mine";

const MainRouter = () => (
  <>
    <Routes>
      <Route exact path="/" element={<Navigate to="/discovery/recommend" />} />
      <Route path="/discovery" element={<Home />}>
        <Route path="recommend" element={<Home />} />
      </Route>
      <Route path="/friend" element={<Friend />} />
      <Route path="/mine" element={<Mine />} />
    </Routes>
  </>
);

export default MainRouter;
