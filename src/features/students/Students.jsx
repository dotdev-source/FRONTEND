import React from "react";
import { useGetStudentsQuery } from "./studentsApiSlice";
import Student from "./student";

const Students = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery();

    let content;

    if (isLoading) {content = <p>Loading</p> }
    if (isError) { content = <p>{error?.data?.message}</p>}
    if (isSuccess) {

        const { ids } = students

        const tableContent = ids?.length
            ? ids.map(studentId => <Student key={studentId} studentId={studentId} />)
            : null

        content = (
            <table className="table table--students">
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

export default Students;
