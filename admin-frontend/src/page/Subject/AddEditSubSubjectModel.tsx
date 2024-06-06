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
import {
  SubSubjectErrorType,
  SubSubjectSchema,
  SubSubjectType,
} from "../../types";
interface SubjectType {
  id: string;
  name: string;
}
const AddEditSubSubjectModel = ({
  open,
  setOpen,
  editSubSubjectId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editSubSubjectId: string | null;
}) => {
  const { setLoader } = useLoaderContext();

  const [errors, setErrors] = useState<SubSubjectErrorType | null>();

  const [data, setData] = useState<SubSubjectType>({ name: "", subject: "" });

  const [baseSubjectData, setBaseSubjectData] = useState([]);

  console.log("editSubSubjectId : ", editSubSubjectId);

  async function getDataById(id: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/subject/sub/${id}`,

        { headers: { token } }
      );
      if (response.status == 200) {
        setData({
          name: response.data.result.name,
          subject: String(response.data.result.subject_id),
        });
      }
      console.log(
        "resposne inside sub subject  model : ",
        typeof response.data.result.subject_id,
        "  ",
        response.data.result.subject_id
      );
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  async function getData() {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const responseBase = await axios.get(
        import.meta.env.VITE_API_URL + "/subject/base",

        { headers: { token } }
      );
      if (responseBase.status == 200) {
        const data = responseBase.data.result;

        setBaseSubjectData(data);
        // setSubSubjectData(subSubject);

        console.log("sub subject data ", data);
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  useEffect(() => {
    console.log(
      "editsubSubjectId : ",
      typeof editSubSubjectId,
      "  ",
      editSubSubjectId
    );
    getData();
    if (editSubSubjectId) {
      getDataById(editSubSubjectId);
    }
  }, [open]);

  async function handleSubmit(e: any) {
    try {
      setLoader({ isLoading: true });
      e.preventDefault();
      setErrors(null);
      const validation = SubSubjectSchema.safeParse(data);
      console.log("validation : ", validation);
      console.log("data : ", data);
      if (validation.success) {
        try {
          const token = localStorage.getItem("token");
          let response;
          console.log("editBaseSubjectId inside api req ", editSubSubjectId);
          if (editSubSubjectId) {
            response = await axios.put(
              import.meta.env.VITE_API_URL + `/subject/sub/${editSubSubjectId}`,
              { name: data.name, subject_id: Number(data.subject) },
              { headers: { token } }
            );
          } else {
            response = await axios.post(
              import.meta.env.VITE_API_URL + "/subject/sub",
              { name: data.name, subject_id: Number(data.subject) },
              { headers: { token } }
            );
          }

          console.log("  response  :  ", response);

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
        setData({ name: "", subject: "" });
        setOpen(!open);
      }}
    >
      <Dialog.Trigger className="float-right">
        <Button>Add Sub Subject</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Sub Subject</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={data?.name}
              defaultValue=""
              placeholder="Enter your subject name"
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
              Base Subject
            </Text>
            <Select.Root
              value={data?.subject}
              onValueChange={
                (e) => {
                  console.log("selected : ", e);
                  setData({ ...data, subject: e });
                }
                //setData({ ...data, subject: Number(e)
              }
            >
              <Select.Trigger className="min-w-full" />
              <Select.Content>
                {baseSubjectData.map((subject: SubjectType) => (
                  <Select.Item value={String(subject.id)}>
                    {subject?.name}
                  </Select.Item>
                ))}
                <Select.Item value="carrot">Carrot</Select.Item>
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
              {editSubSubjectId ? "Update" : "Add"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddEditSubSubjectModel;
