import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      <h1>Hello</h1>
      <Link to="character/test">Go to Character/test</Link>
    </>
  );
}

export default Root;
