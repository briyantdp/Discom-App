import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";

import useInput from "../hooks/useInput";

import { asyncAddThread } from "../states/threads/action";

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, onBodyChange] = useInput("");

  const createThreadHandler = (event) => {
    event.preventDefault();

    dispatch(asyncAddThread({ title, category, body }));
    navigate("/");
  };

  return (
    <main className="create-thread  flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="black" className="text-center">
            Tambah Thread
          </Typography>
          <form
            className="mt-8 mb-2 flex flex-col gap-3"
            onSubmit={createThreadHandler}
          >
            <Input
              type="text"
              label="Judul"
              size="lg"
              value={title}
              onChange={onTitleChange}
            />
            <Input
              type="text"
              label="Kategori"
              size="lg"
              value={category}
              onChange={onCategoryChange}
            />
            <Textarea
              variant="static"
              placeholder="Apa yang anda pikirkan ?"
              rows={8}
              value={body}
              onChange={onBodyChange}
            />
            <Button type="submit" variant="gradient">
              Buat
            </Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
