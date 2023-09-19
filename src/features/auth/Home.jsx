import { Link } from "react-router-dom";
import Students from "../students/Students";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { fullname, isStudent, isTeacher, isAdmin } = useAuth();

  let content;
  if (isStudent) {
    content = `<p>Show student Dashboard here</p>`
  } else if (isTeacher) {
content = `<p>Show teacher Dashboard here</p>`
  } else if (isAdmin) { 
    content = `<p>Show admin Dashboard here</p>`
  }

  return (
    <>
      <h1>Welcome {fullname}</h1>
    {content}
    </>
  );
};

export default Home;
