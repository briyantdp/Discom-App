/* eslint-disable import/extensions */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import LoadingBarComponent from './components/LoadingBarComponent';
import Toast from './components/Toast';
import Header from './components/Header';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import CreateThreadPage from './pages/CreateThreadPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Header />
        <Toast />
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <LoadingBarComponent />
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:threadId" element={<DetailPage />} />
        <Route path="/new" element={<CreateThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
