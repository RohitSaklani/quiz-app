import React from "react";

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import useLoaderContext from "../../context/LoaderContext";
import { QuizErrorType, QuizSchema, QuizType, level } from "../../types";

interface SubjectType {
  id: string;
  name: string;
}

const AddEditQuiz = ({
  open,
  setOpen,
  editQuizId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editQuizId: string | null;
}) => {
  const { setLoader } = useLoaderContext();

  const [errors, setErrors] = useState<QuizErrorType | null>();
  const [data, setData] = useState<QuizType>({
    name: "",
    subject: "",
    level: "",
  });

  const [subjectList, setSubjectList] = useState([]);

  async function getData() {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const responseBase = await axios.get(
        import.meta.env.VITE_API_URL + "/subject/sub",

        { headers: { token } }
      );
      if (responseBase.status == 200) {
        const data = responseBase.data.result;

        setSubjectList(data);
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  async function getDataById(id: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/quizs/${id}`,

        { headers: { token } }
      );
      if (response.status == 200) {
        setData({
          name: response.data.result.name,
          subject: String(response.data.result.subject_id),
          level: String(response.data.result.level),
        });
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  useEffect(() => {
    getData();

    if (editQuizId) {
      getDataById(editQuizId);
    }
  }, [open]);

  async function handleSubmit(e: any) {
    try {
      setLoader({ isLoading: true });
      e.preventDefault();
      setErrors(null);
      const validation = QuizSchema.safeParse(data);

      if (validation.success) {
        try {
          const token = localStorage.getItem("token");
          let response;

          if (editQuizId) {
            response = await axios.put(
              import.meta.env.VITE_API_URL + `/quizs/${editQuizId}`,
              {
                name: data.name,
                level: Number(data.level),
                subject_id: Number(data.subject),
              },

              { headers: { token } }
            );
          } else {
            response = await axios.post(
              import.meta.env.VITE_API_URL + "/quizs",
              {
                name: data.name,
                level: Number(data.level),
                subject_id: Number(data.subject),
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
        setData({ name: "", subject: "", level: "" });
        setOpen(!open);
      }}
    >
      <Dialog.Trigger className="float-right">
        <Button>Add Quiz</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Quiz</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={data?.name}
              defaultValue=""
              placeholder="Enter Quiz Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.name?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Subject
            </Text>
            <Select.Root
              value={data?.subject}
              onValueChange={
                (e) => {
                  setData({ ...data, subject: e });
                }
                //setData({ ...data, subject: Number(e)
              }
            >
              <Select.Trigger className="min-w-full" />
              <Select.Content>
                {subjectList.map((subject: SubjectType) => (
                  <Select.Item value={String(subject.id)}>
                    {subject?.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.subject?._errors[0] ?? " "}
            </Text>
          </label>
        </Flex>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Level
            </Text>
            <Select.Root
              value={data?.level}
              onValueChange={
                (e) => {
                  setData({ ...data, level: e });
                }
                //setData({ ...data, subject: Number(e)
              }
            >
              <Select.Trigger className="min-w-full" />
              <Select.Content>
                {level.map((level) => (
                  <Select.Item value={String(level.value)}>
                    {level?.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text color="red" size={"2"} className="min-h-[20px] block">
              {errors?.subject?._errors[0] ?? " "}
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
              {editQuizId ? "Update" : "Add"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddEditQuiz;
