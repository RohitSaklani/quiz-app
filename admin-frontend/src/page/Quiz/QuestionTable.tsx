import { Box, Container, Flex, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import useLoaderContext from "../../context/LoaderContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { optionNumber } from "../../types";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import AddEditQuestion from "./AddEditQuestion";

export function QuestionTable() {
  const { id } = useParams();

  const [questionList, setQuestionList] = useState([]);

  const [editQuizId, setEditQuizId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const { setLoader } = useLoaderContext();

  async function deleteQuestion(questionId: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/quiz/${id}/question/${questionId}`,

        { headers: { token } }
      );
      if (response.status == 200) {
        toast.success(response.data.message);

        getData();
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      // setLoader({ isLoading: false, opacity: 50 });
    }
  }

  async function getData() {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const responseBase = await axios.get(
        import.meta.env.VITE_API_URL + `/quiz/${id}/question`,

        { headers: { token } }
      );
      if (responseBase.status == 200) {
        const data = responseBase.data.result;

        setQuestionList(data);
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  useEffect(() => {
    if (!open) {
      getData();
      setEditQuizId(null);
    }
  }, [open]);

  return (
    <Flex>
      <div className="my-5    flex flex-row  flex-wrap  justify-start	">
        {" "}
        {/* <Flex justify={"between"} className="m-[2rem] mx-[4rem] w-[100%]">
          {" "}
          <Text className="text-3xl font-normal">Questions</Text>
          <AddEditQuestion
            open={open}
            setOpen={setOpen}
            editQuizId={editQuizId}
          />{" "}
        </Flex> */}
        {questionList.map((ele: any, index: number) => (
          <Flex
            direction={"column"}
            className=" md:w-[600px] lg:min-w-[600px] m-3 border-2 p-2 rounded-md"
          >
            {/* w-[95vw] sm:w-[95vw] */}
            <div className="text-lg my-1">
              <span className="font-medium">{index + 1 + ")- "}</span>{" "}
              <span className=""> {" " + ele.question}</span>
            </div>
            <Flex direction={"column"} className="w-full pl-3" wrap={"wrap"}>
              {ele.options.map((option: any, index: number) => (
                <div className="flex  items-center gap-2">
                  {optionNumber[index + 4] + ")- " + option.description}{" "}
                  <span>
                    {" "}
                    {option.isRight ? <FaCheck color="green" /> : null}
                  </span>
                </div>
              ))}
            </Flex>
            <div className="flex justify-end items-end gap-2 my-2 flex-grow">
              {" "}
              <IconButton
                size="1"
                variant="soft"
                onClick={() => {
                  setOpen(true);
                  setEditQuizId(ele.id);
                }}
              >
                <FaRegEdit />
              </IconButton>
              <IconButton
                size="1"
                variant="soft"
                color="red"
                onClick={() => deleteQuestion(ele.id)}
              >
                <MdDeleteOutline />
              </IconButton>
            </div>
          </Flex>
        ))}
      </div>
    </Flex>
  );
}
