import React from "react";

import {
  Button,
  Dialog,
  Flex,
  Radio,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import useLoaderContext from "../../context/LoaderContext";
import { QuestionErrorType, QuestionSchema, QuestionType } from "../../types";
import { useParams } from "react-router-dom";

const AddEditQuestion = ({
  open,
  setOpen,
  editQuestionId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editQuestionId: string | null;
}) => {
  const { setLoader } = useLoaderContext();

  const { id } = useParams();

  const [errors, setErrors] = useState<QuestionErrorType | null>();
  const [data, setData] = useState<QuestionType>({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    isRight: 1,
  });

  async function getDataById(questionId: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/quiz/${id}/question/${questionId}`,

        { headers: { token } }
      );

      if (response.status == 200) {
        const optionResult = response.data.result.options.reduce(
          (acc: any, option: any, index: number) => {
            return acc?.isRight
              ? { ...acc, [`option${index + 1}`]: option.description }
              : {
                  ...acc,
                  [`option${index + 1}`]: option.description,
                  isRight: option.isRight ? index + 1 : null,
                };
          },
          {}
        );

        setData({
          question: response.data.result.question,
          ...optionResult,
        });
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  useEffect(() => {
    if (editQuestionId && open) {
      getDataById(editQuestionId);
    }
  }, [open]);

  async function handleSubmit(e: any) {
    try {
      setLoader({ isLoading: true });
      e.preventDefault();
      setErrors(null);
      const validation = QuestionSchema.safeParse(data);

      if (validation.success) {
        try {
          const token = localStorage.getItem("token");
          let response;
          let options: { description: string | number; isRight: boolean }[] =
            [];

          for (let i = 1; i < 5; ++i) {
            let x: string = `option${i}`;
            options[i - 1] = {
              description: data[x as keyof QuestionType],
              isRight: data.isRight == i,
            };
          }
          if (editQuestionId) {
            response = await axios.put(
              import.meta.env.VITE_API_URL +
                `/quiz/${id}/question/${editQuestionId}`,
              {
                question: data.question,
                options,
              },
              { headers: { token } }
            );
          } else {
            response = await axios.post(
              import.meta.env.VITE_API_URL + `/quiz/${id}/question`,
              {
                question: data.question,
                options,
              },
              { headers: { token } }
            );
          }

          if (response.status === 200) {
            setOpen(false);
            toast.success(response.data.message);
            // navigate(0);
          }
        } catch (err: any) {
          toast.error(err.response.data.error);
        }
      } else {
        setErrors(validation.error?.format());
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          isRight: 1,
        });
        setOpen(!open);
      }}
    >
      <Dialog.Trigger className="float-right">
        <Button>Add Question</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Add Question</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Question
            </Text>
            <TextArea
              value={data?.question}
              defaultValue=""
              placeholder="Enter Question"
              onChange={(e) => setData({ ...data, question: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.question?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Option A
              <Radio
                className="ml-3"
                color="green"
                name="option"
                value="1"
                checked={data?.isRight == 1}
                onChange={(e) =>
                  setData({ ...data, isRight: Number(e.target.value) })
                }
              />
            </Text>
            <TextField.Root
              value={data?.option1}
              defaultValue=""
              placeholder="option"
              onChange={(e) => setData({ ...data, option1: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.option1?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Option B
              <Radio
                className="ml-3"
                color="green"
                name="option"
                value="2"
                checked={data?.isRight == 2}
                onChange={(e) =>
                  setData({ ...data, isRight: Number(e.target.value) })
                }
              />
            </Text>
            <TextField.Root
              value={data?.option2}
              defaultValue=""
              placeholder="option"
              onChange={(e) => setData({ ...data, option2: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.option2?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Option C
              <Radio
                className="ml-3"
                color="green"
                name="option"
                value="3"
                checked={data?.isRight == 3}
                onChange={(e) =>
                  setData({ ...data, isRight: Number(e.target.value) })
                }
              />
            </Text>
            <TextField.Root
              value={data?.option3}
              defaultValue=""
              placeholder="option"
              onChange={(e) => setData({ ...data, option3: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.option3?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Option D
              <Radio
                className="ml-3"
                color="green"
                name="option"
                value="4"
                checked={data?.isRight == 4}
                onChange={(e) =>
                  setData({ ...data, isRight: Number(e.target.value) })
                }
              />
            </Text>
            <TextField.Root
              value={data?.option4}
              defaultValue=""
              placeholder="option"
              onChange={(e) => setData({ ...data, option4: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.option4?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>
              {editQuestionId ? "Update" : "Add"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddEditQuestion;
