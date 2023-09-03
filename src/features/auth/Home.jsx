import { Link } from "react-router-dom";
import Students from "../students/Students";

const Home = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Link to='/dashboard/students' element={<Students />}>Go to students</Link>

    </>
  );
};

export default Home;
