import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Input, Tooltip, Typography, Avatar } from "@material-tailwind/react";

import useInput from "../hooks/useInput";

import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function Header({ onSignOut }) {
  const authUser = useSelector((state) => state.authUser);

  const [keyword, onKeywordChange] = useInput("");

  return (
    <header className="bg-blue-gray-900 fixed w-full p-4 z-20">
      <nav className="w-full lg:container lg:mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <ChatBubbleLeftRightIcon className="size-10" />
          <h1 className="font-mono text-4xl text-white">Discom</h1>
        </Link>
        <div className="w-full max-w-[36rem]">
          <Input
            value={keyword}
            onChange={onKeywordChange}
            color="orange"
            className="text-orange-400"
            label="Search thread"
            icon={<MagnifyingGlassIcon color={keyword ? "orange" : "white"} />}
          />
        </div>
        <ul className="text-white flex gap-0 md:gap-6">
          <li className="p-3 hover:bg-orange-400 hover:rounded-full hover:transition-all hover:duration-75">
            <Tooltip
              content={
                <Typography color="white" className="text-sm">
                  Leaderboards
                </Typography>
              }
              placement="bottom"
              offset={30}
            >
              <Link to="/leaderboards">
                <ChartBarIcon width={30} />
              </Link>
            </Tooltip>
          </li>
          <li className="p-3 hover:bg-orange-400 hover:rounded-full hover:transition-all hover:duration-75">
            <Tooltip
              content={
                <Typography color="white" className="text-sm">
                  Create Threads
                </Typography>
              }
              placement="bottom"
              offset={30}
            >
              <Link to="/new">
                <PlusIcon width={30} />
              </Link>
            </Tooltip>
          </li>
          <li className="p-2 hover:bg-orange-400 hover:rounded-full hover:transition-all hover:duration-75">
            {authUser ? (
              <Tooltip
                content={
                  <Typography color="white" className="text-sm">
                    Logout
                  </Typography>
                }
                placement="bottom"
                offset={30}
              >
                <Link to="/" onClick={onSignOut}>
                  <Avatar
                    src={`${authUser.avatar}`}
                    alt={`${authUser.name}`}
                    size="sm"
                  />
                </Link>
              </Tooltip>
            ) : (
              <Tooltip
                content={
                  <Typography color="white" className="text-sm">
                    Login
                  </Typography>
                }
                placement="bottom"
                offset={30}
              >
                <Link to="/">
                  <ArrowRightStartOnRectangleIcon width={30} />
                </Link>
              </Tooltip>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  onSignOut: PropTypes.func,
};
