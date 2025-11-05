// src/App.jsx

// 1. We import the main page component we're about to create.
// Assuming you'll create a 'pages' folder for organization.
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage/homepage";

// 2. Import the main CSS file. Tailwind will use this.
import "./index.css";

function App() {
  // We can wrap the Homepage in any overall layout components (like a Navbar or Footer) later.
  return (
    <div className="">
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
