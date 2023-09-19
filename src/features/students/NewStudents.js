import NewStudentForm from "./NewNoteForm";
import { useGetTeachersQuery } from "./teachersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const NewStudent = () => {
    const { teacher } = useGetTeachersQuery('Teacher', {
        selectFromResultData: ({ data }) => ({
            teachers: data?.ids.map(id => data?.entities[id])
        })
    });

  if (!teacher?.length) return <PulseLoader color="fff" />;

  const content = <NewStudentForm teacher={teacher} />;

  return content;
};
export default NewStudent;
