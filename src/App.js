import Todo from "./pages/Todo";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; Uncomment this (code 1)

function App() {
  //It's returning only the TODO because that's the only thing that's there. If you want to return more, Install react-router-dom
  //run `npm i react-router-dom`
  //The Uncomment this line of code (code 1 and code 2)

  //Code 2
  // return(
  //   <Router>
  //       <Routes>
  //         <Route path="/" element={<Todo />} />
  //       </Routes>
  //     </Router>
  // )

  return <Todo />;
}

export default App;
