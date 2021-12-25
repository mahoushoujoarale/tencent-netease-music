import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../pages/Friend/Friend";
import Mine from "../pages/Mine/Mine";
import Song from "../pages/Song/Song";
import Album from "@/pages/Album/Album";
import Playlist from "@/pages/Playlist/Playlist";
import NotFound from "../components/NotFound/NotFound";
import DJRadio from "@/pages/DJRadio/DJRadio"
import User from '@/pages/User/User'
<<<<<<< HEAD
import TopPlayList from "@/pages/TopPlaylist/TopPlaylist";
import SearchPage from "@/pages/SearchPage/SearchPage";
=======
import Singer from "@/pages/Singer/Singer";
>>>>>>> wy

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
<<<<<<< HEAD
      <Route path="/user/home?id=1877725922" element={<User />} />
      <Route path="/discovery/playlist" element={<TopPlayList />}/>
      <Route path="search" element={<SearchPage />}/>
=======
      <Route path="discovery/singer" element={<Singer />} />
      <Route path="user/home" element={<User />} />
>>>>>>> wy
      <Route path="friend" element={<Friend />} />
      <Route path="mine" element={<Mine />} />
      <Route path="song" element={<Song />} />
      <Route path="album" element={<Album />} />
      <Route path="playlist" element={<Playlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default MainRouter;
