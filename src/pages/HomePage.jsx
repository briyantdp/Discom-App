import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import CategorySection from '../components/CategorySection';
import ThreadList from '../components/ThreadList';

import { asyncPopulateUsersAndThreads } from '../states/shared/action';

export default function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const categories = useSelector((states) => states.categories);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category');

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [currentThread, setCurrentThread] = useState([]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    if (threads && users && authUser) {
      const newThreads = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));

      setCurrentThread(newThreads);

      if (keyword) {
        setCurrentThread(
          newThreads.filter((thread) => thread.title.toLowerCase().includes(keyword.toLowerCase())),
        );
      }

      if (selectedCategory) {
        setCurrentThread(
          newThreads.filter((thread) => thread.category === selectedCategory),
        );
      }
    }
  }, [threads, users, authUser, keyword, selectedCategory]);

  const keywordChangeHandler = (event) => {
    const { value } = event.target;
    setKeyword(value);
    setSearchParams({ keyword: value });
  };

  const setSelectedCategoryHandler = (category) => {
    if (category === selectedCategory) {
      return setSearchParams({});
    }
    return setSearchParams({ category });
  };

  if (!authUser) {
    return <p>Loading....</p>;
  }

  return (
    <main className="home-page min-h-screen py-48 md:py-36 lg:py-24 md:gap-6 lg:container lg:mx-auto text-white">
      <Input
        label="Cari diskusi"
        variant="outlined"
        size="lg"
        color="orange"
        className="text-orange-500"
        value={keyword}
        onChange={keywordChangeHandler}
        icon={(
          <MagnifyingGlassIcon
            color={keyword.length > 0 ? 'orange' : 'white'}
          />
        )}
      />
      <div className="md:flex">
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategoryHandler}
        />
        <ThreadList threadList={currentThread} />
      </div>
    </main>
  );
}
