import { Routes, Route, Link } from "react-router-dom";
import Details from "./Component/Details";
import Header from "./Component/Header";
import Homepage from "./Component/Homepage";

function App() {
  return (
    <div id="app" className="bg-very-light-gray">
      <Header />
      <Routes>
        <Route
          path="*"
          element={
            <div className=" text-center mt-10 flex flex-col h-screen">
              <h1 className="font-bold text-2xl">404 Not Found!</h1>
              <Link
                to="/"
                className="mt-5 p-2 w-32 shadow-3xl font-semibold mx-auto active:bg-dark-gray"
              >
                Back to Home
              </Link>
            </div>
          }
        />
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:countryName" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
