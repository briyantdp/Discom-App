import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import {
  Typography,
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Textarea,
} from "@material-tailwind/react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

import useInput from "../hooks/useInput";

import {
  asyncReceiveDetailThread,
  asyncAddComment,
} from "../states/detailThread/action";

export default function DetailPage() {
  const detailThread = useSelector((state) => state.detailThread);
  const dispatch = useDispatch();
  const { threadId } = useParams();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, [threadId, dispatch]);

  const [content, onContentChange] = useInput("");

  const createCommentHandler = (event) => {
    event.preventDefault();

    dispatch(asyncAddComment({ threadId, content }));
  };

  return (
    <main className="detail-thread flex flex-col gap-4 py-56 md:py-48 lg:py-36 lg:container lg:mx-auto text-white">
      <Card className="detail-thread__content container mx-auto w-4/5">
        <CardBody>
          <div className="mb-3 flex flex-col gap-4">
            <div className="author-threads flex items-center gap-2">
              <img
                className="size-8 rounded-full object-cover object-center "
                src={detailThread.owner.avatar}
                alt={detailThread.owner.name}
              />
              <Typography variant="paragraph" className="text-black">
                <span className="font-bold">{detailThread.owner.name}</span> •{" "}
                {detailThread.createdAt}
              </Typography>
            </div>
            <Typography variant="h4" className="text-black">
              {detailThread.title}
            </Typography>
            <Button
              color="orange"
              size="sm"
              className="w-fit rounded-full focus:bg-orange-500 text-white"
            >
              #{detailThread.category}
            </Button>
            <Typography variant="paragraph" className="font-light text-black">
              {parse(detailThread.body)}
            </Typography>
          </div>
        </CardBody>
        <CardFooter>
          <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
            <ButtonGroup className="flex bg-gray-800 gap-1 font-bold  rounded-full">
              <Button className="rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500">
                <ArrowUpIcon className="font-bold" width={15} />
              </Button>
              <span className="self-center text-white">
                {detailThread.upVotesBy.length -
                  detailThread.downVotesBy.length}
              </span>
              <Button className="rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-red-500">
                <ArrowDownIcon className="font-bold" width={15} />
              </Button>
            </ButtonGroup>
            <a
              className="cursor-pointer inline-flex p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700
                items-center"
              href="#comment-thread"
            >
              <ChatBubbleBottomCenterTextIcon width={15} />
              <span className="ml-3 text-sm font-bold">
                {detailThread.comments.length}
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>

      <Card
        className="detail-thread__comment container mx-auto w-4/5"
        id="comment-thread"
      >
        <CardBody>
          <Typography variant="h5" color="black">
            Beri komentar
          </Typography>

          <form onSubmit={createCommentHandler}>
            <Textarea
              variant="static"
              placeholder="Your Comment"
              rows={8}
              value={content}
              onChange={onContentChange}
            />
            <Button type="submit" className="bg-gray-800 rounded-full p-4 my-4">
              Comment
            </Button>
          </form>

          <div className="comment-list my-8">
            <Typography variant="h5" className="text-black mb-4">
              Komentar ({detailThread.comments.length})
            </Typography>
            {detailThread.comments.map(
              ({ id, content, createdAt, owner, upVotesBy, downVotesBy }) => (
                <div
                  className="comment-item flex flex-col gap-4 py-8 border-t-2 border-gray-200"
                  key={id}
                >
                  <div className="author-threads flex items-center gap-2">
                    <img
                      className="size-8 rounded-full object-cover object-center "
                      src={owner.avatar}
                      alt={owner.name}
                    />
                    <Typography variant="paragraph" className="text-black">
                      <span className="font-bold">{owner.name}</span> •{" "}
                      {createdAt}
                    </Typography>
                  </div>

                  <Typography
                    variant="paragraph"
                    className="font-light text-black"
                  >
                    {parse(content)}
                  </Typography>

                  <ButtonGroup className=" w-fit flex bg-gray-800 gap-1 font-bold rounded-full">
                    <Button className="rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500">
                      <ArrowUpIcon className="font-bold" width={15} />
                    </Button>
                    <span className="self-center text-white">
                      {upVotesBy.length - downVotesBy.length}
                    </span>
                    <Button className="rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-red-500">
                      <ArrowDownIcon className="font-bold" width={15} />
                    </Button>
                  </ButtonGroup>
                </div>
              )
            )}
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
