import React from "react";
import { useGetTeachersQuery } from "./teachersApiSlice";
import Teachers from "./Teachers";

const Teacherss = () => {
  const {
    data: teachers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTeachersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
});

    let content;

    if (isLoading) {content = <p>Loading</p> }
    if (isError) { content = <p>{error?.data?.message}</p>}
    if (isSuccess) {

        const { ids } = teachers

        const tableContent = ids?.length
            ? ids.map(teacherId => <Teachers key={teacherId} teachersId={teacherId} />)
            : null

        content = (
            <table className="table table--teacherss">
                <thead className="table__thead">
                    <tr>
                        <th >Full Name</th>
                        <th>Classe</th>
                        <th >House</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
};

export default Teacherss;
