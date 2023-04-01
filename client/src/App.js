import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: "30px 0"
      }}
    >
      <Home />
    </div>
  );
}

export default App;
