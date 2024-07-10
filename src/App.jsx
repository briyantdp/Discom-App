import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import CreateThreadPage from "./pages/CreateThreadPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";

import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const signOutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Header onSignOut={signOutHandler} />
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:threadId" element={<DetailPage />} />
        <Route path="/new" element={<CreateThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
