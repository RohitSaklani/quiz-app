import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import useLoaderContext from "../../context/LoaderContext";
import {
  BaseSubjectErrorType,
  BaseSubjectSchema,
  BaseSubjectType,
} from "../../types";

const AddEditBaseSubjectModel = ({
  open,
  setOpen,
  editBaseSubjectId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editBaseSubjectId: string | null;
}) => {
  const { setLoader } = useLoaderContext();

  const [errors, setErrors] = useState<BaseSubjectErrorType | null>();

  const [data, setData] = useState<BaseSubjectType>({ name: "" });

  async function getDataById(id: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/subject/base/${id}`,

        { headers: { token } }
      );
      if (response.status == 200) {
        setData({ ...data, name: response.data.result.name });
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }

  useEffect(() => {
    if (editBaseSubjectId) {
      getDataById(editBaseSubjectId);
    }
  }, [open]);

  async function handleSubmit(e: any) {
    try {
      setLoader({ isLoading: true });
      e.preventDefault();
      setErrors(null);
      const validation = BaseSubjectSchema.safeParse(data);

      if (validation.success) {
        try {
          const token = localStorage.getItem("token");
          let response;
          if (editBaseSubjectId) {
            response = await axios.put(
              import.meta.env.VITE_API_URL +
                `/subject/base/${editBaseSubjectId}`,
              data,
              { headers: { token } }
            );
          } else {
            response = await axios.post(
              import.meta.env.VITE_API_URL + "/subject/base",
              data,
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
        setData({ name: "" });
        setOpen(!open);
      }}
    >
      <Dialog.Trigger className="float-right">
        <Button>Add Base Subject</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Base Subject</Dialog.Title>

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

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>
              {editBaseSubjectId ? "Update" : "Add"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddEditBaseSubjectModel;
