import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

import { asyncPopulateUsersAndThreads } from "../states/shared/action";

export default function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    createdAt: new Date(thread.createdAt).toLocaleString("id-ID"),
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <main className="home-page min-h-screen py-48 md:flex md:gap-6 lg:container lg:mx-auto text-white">
      <section className="my-6 home-page__categories-list p-4  rounded-xl w-full md:w-1/3 lg:w-2/5 h-full">
        <Typography variant="h5">Kategori Populer</Typography>
        <div className="btn-group-categories-list my-2">
          {threadList.map((thread, index) => {
            return (
              <Button
                key={index}
                variant="outlined"
                color="orange"
                size="sm"
                className="rounded-full focus:bg-orange-500 mx-1 my-1 text-white"
              >
                #{thread.category}
              </Button>
            );
          })}
        </div>
      </section>
      <section className="my-6 home-page__content p-4 rounded-xl w-full md:w-2/3 lg:w-3/5">
        <h1 className="font-bold text-3xl">Threads</h1>
        {threadList.map(
          ({
            id,
            title,
            category,
            user,
            createdAt,
            body,
            upVotesBy,
            downVotesBy,
            totalComments,
          }) => {
            return (
              <Card
                className="home-page__content__threads my-4 w-full "
                key={id}
              >
                <CardBody className="mb-3 flex flex-col gap-4">
                  <Typography
                    variant="h4"
                    className=" threads__title text-black"
                  >
                    {title}
                  </Typography>
                  <Button
                    color="orange"
                    size="sm"
                    className="threads__category w-fit rounded-full focus:bg-orange-500 text-white"
                  >
                    #{category}
                  </Button>
                  <div className="threads__author flex items-center gap-2">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      size="sm"
                      className="threads__author__avatar"
                    />
                    <Typography
                      variant="paragraph"
                      ripple={user.name.toString()}
                      className="threads__author__name text-black font-bold"
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="paragraph"
                      ripple={createdAt.toString()}
                      className="threads__author__createdAt text-black"
                    >
                      {createdAt}
                    </Typography>
                  </div>
                  <hr />
                  {parse(body)}
                </CardBody>
                <CardFooter className="group mt-8 inline-flex flex-wrap items-center gap-3">
                  <ButtonGroup className="flex bg-gray-800 gap-1 font-bold rounded-full">
                    <Button className="threads__upvote rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500">
                      <ArrowUpIcon className="font-bold" width={15} />
                    </Button>
                    <Typography
                      variant="paragraph"
                      className="threads__votes self-center text-white"
                    >
                      {upVotesBy.length - downVotesBy.length}
                    </Typography>
                    <Button className="threads__downvote rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-red-500">
                      <ArrowDownIcon className="font-bold" width={15} />
                    </Button>
                  </ButtonGroup>
                  <Link
                    className="threads__commentscursor-pointer inline-flex p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700
                items-center"
                    to={`/threads/${id}`}
                  >
                    <ChatBubbleBottomCenterTextIcon width={15} />
                    <span className="ml-3 text-sm font-bold">
                      {totalComments}
                    </span>
                  </Link>
                </CardFooter>
              </Card>
            );
          }
        )}
      </section>
    </main>
  );
}
