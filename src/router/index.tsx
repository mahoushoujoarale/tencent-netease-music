import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../pages/Friend/Friend";
import Mine from "../pages/Mine/Mine";
import Song from "../pages/Song/Song";
import Album from "@/pages/Album/Album";
import NotFound from "../components/NotFound/NotFound";

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
      <Route path="song" element={<Song />} />
      <Route path="album" element={<Album />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default MainRouter;
