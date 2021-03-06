import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../pages/Friend/Friend";
import Mine from "../pages/Mine/Mine";
import Song from "../pages/Song/Song";
import Album from "@/pages/Album/Album";
import Playlist from "@/pages/Playlist/Playlist";
import NotFound from "../components/NotFound/NotFound";
import DJRadio from "@/pages/DJRadio/DJRadio";
import User from "@/pages/User/User";
import SearchPage from "@/pages/SearchPage/SearchPage";
import Singer from "@/pages/Singer/Singer";
import RadioplayList from "@/pages/RadioplayList/RadioplayList";
import SingerCat from "@/pages/SingerCat/SingerCat";

const MainRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/discovery/recommend" />} />
      <Route
        path="discovery"
        element={<Navigate to="/discovery/recommend" />}
      />
      <Route path="/discovery/recommend" element={<Home />} />
      <Route path="/discovery/djradio" element={<DJRadio />} />
      <Route path="/user/home" element={<User />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="discovery/singer" element={<Singer />} />
      <Route path="user/home" element={<User />} />
      <Route path="djradio" element={<RadioplayList />} />
      <Route path="friend" element={<Friend />} />
      <Route path="mine" element={<Mine />} />
      <Route path="song" element={<Song />} />
      <Route path="album" element={<Album />} />
      <Route path="playlist" element={<Playlist />} />
      <Route path="discovery/singer/cat" element={<SingerCat/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default MainRouter;
