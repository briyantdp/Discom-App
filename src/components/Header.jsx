import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tooltip,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import {
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';

import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function Header() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const onSignOutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (!authUser) {
    return (
      <header className="bg-blue-gray-900 fixed w-full p-4 z-20">
        <nav className="w-full lg:container lg:mx-auto flex flex-col md:flex-row items-center gap-6 justify-center">
          <Link to="/" className="flex items-center gap-2 text-white">
            <ChatBubbleLeftRightIcon className="size-10" />
            <h1 className="font-mono text-4xl text-white">Discom</h1>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="bg-blue-gray-900 fixed w-full p-4 z-20">
        <nav className="w-full lg:container lg:mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          <Link to="/" className="flex items-center gap-2 text-white">
            <ChatBubbleLeftRightIcon className="size-10" />
            <h1 className="font-mono text-4xl text-white">Discom</h1>
          </Link>

          <ul className="text-white flex gap-0 md:gap-6">
            <li className="p-3 hover:bg-orange-400 hover:rounded-full hover:transition-all hover:duration-75">
              <Tooltip
                content={(
                  <Typography color="white" className="text-sm">
                    Klasemen
                  </Typography>
                )}
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
                content={(
                  <Typography color="white" className="text-sm">
                    Buat Diskusi
                  </Typography>
                )}
                placement="bottom"
                offset={30}
              >
                <Link to="/new">
                  <PlusIcon width={30} />
                </Link>
              </Tooltip>
            </li>
            <li className="p-2 hover:bg-orange-400 hover:rounded-full hover:transition-all hover:duration-75">
              <Tooltip
                content={(
                  <Typography color="white" className="text-sm">
                    Keluar
                  </Typography>
                )}
                placement="bottom"
                offset={30}
              >
                <Link to="/" onClick={handleOpen}>
                  <Avatar
                    src={`${authUser.avatar}`}
                    alt={`${authUser.name}`}
                    size="sm"
                  />
                </Link>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </header>

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader className="text-center">Logout dari Discom</DialogHeader>
        <DialogBody>
          Apakah anda yakin ingin keluar sekarang ? Masih banyak diskusi yang
          menarik untuk anda 😊
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="orange" onClick={onSignOutHandler}>
            <span>Konfirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
