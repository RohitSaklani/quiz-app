import { Container, Flex, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
  defaultThemes,
} from "react-data-table-component";
import useLoaderContext from "../../context/LoaderContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineVisibility } from "react-icons/md";
import toast from "react-hot-toast";
import AddEditQuiz from "./AddEditQuiz";
import { levelArr } from "../../types";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../../utils";

const customStyles: TableStyles = {
  header: {
    style: {
      minHeight: "56px",
      fontSize: "1.8rem",
      paddingBottom: "2rem",

      fontWeight: "bold",
    },
  },

  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "2px",
      borderTopColor: defaultThemes.default.divider.default,
      fontSize: "0.9rem",
    },
  },
  headCells: {
    style: {
      justifyContent: "center",
      borderRightStyle: "solid",
      borderRightWidth: "2px",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRightColor: defaultThemes.default.divider.default,
      fontWeight: "bold",

      "&:first-of-type": {
        borderLeftStyle: "solid",
        borderLeftWidth: "2px",
      },
    },
  },
  cells: {
    style: {
      justifyContent: "center",
      borderRightStyle: "solid",
      borderRightWidth: "2px",
      borderRightColor: defaultThemes.default.divider.default,
      fontSize: "0.9rem",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontWeight: "450",
      color: "#52527a",

      "&:first-of-type": {
        borderLeftStyle: "solid",
        borderLeftWidth: "2px",
      },
    },
  },
};

export function QuizTable() {
  const [quizDataList, setQuizDataList] = useState([]);

  const [editQuizId, setEditQuizId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const { setLoader } = useLoaderContext();
  const navigate = useNavigate();

  const QuizColumns: TableColumn<any>[] = [
    {
      name: "Id",
      selector: (row) => row.id,

      maxWidth: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Level",
      selector: (row) => levelArr[row.level - 1],
    },
    {
      name: "Subject",
      selector: (row) => row.subject.name,
    },
    {
      name: "Created at",
      selector: (row) => convertToDate(row.createdAt),
    },
    {
      name: "Updated at",
      selector: (row) => convertToDate(row.updatedAt),
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className="flex gap-2">
            {" "}
            <IconButton
              size="1"
              variant="soft"
              onClick={() => navigate(`/quiz/${row.id}`)}
            >
              <MdOutlineVisibility />
            </IconButton>
            <IconButton
              size="1"
              variant="soft"
              onClick={() => {
                setOpen(true);
                setEditQuizId(row.id);
              }}
            >
              <FaRegEdit />
            </IconButton>
            <IconButton
              size="1"
              variant="soft"
              color="red"
              onClick={() => deleteQuiz(row.id)}
            >
              <MdDeleteOutline />
            </IconButton>
          </div>
        </>
      ),
    },
  ];

  async function deleteQuiz(id: string) {
    setLoader({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/quizs/${id}`,

        { headers: { token } }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        setLoader({ isLoading: false, opacity: 50 });

        getData();
      }
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
        import.meta.env.VITE_API_URL + "/quizs",

        { headers: { token } }
      );
      if (responseBase.status == 200) {
        const data = responseBase.data.result;

        setQuizDataList(data);
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
    <Container className="m-4 border-2 min-h-[70vh] p-4 ">
      {" "}
      <Flex justify={"between"} className="m-[2rem]">
        {" "}
        <Text className="text-3xl font-normal">Quiz</Text>
        <AddEditQuiz open={open} setOpen={setOpen} editQuizId={editQuizId} />
      </Flex>
      <DataTable
        columns={QuizColumns}
        data={quizDataList}
        paginationPerPage={5}
        customStyles={customStyles}
        pagination
        responsive
      />
    </Container>
  );
}
