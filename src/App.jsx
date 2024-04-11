import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import { ThemeProvider } from "@material-tailwind/react";
import Test from "./pages/Test";
import AuthState from "./context/AuthState";

function App() {
  //   const [time, setTime] = useState('fetching')
  //   useEffect(()=>{
  //     const socket = io('http://localhost:5000')
  //     socket.on('connect', ()=>console.log(socket.id))
  //     socket.on('connect_error', ()=>{
  //       setTimeout(()=>socket.connect(),5000)
  //       console.log("Connected: ",socket)
  //     })
  //    socket.on('time', (data)=>setTime(data))
  //    socket.on('disconnect',()=>setTime('server disconnected'))

  //  },[])

  return (
    <>
      <ThemeProvider>
        <AuthState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/editor/:slug" element={<Editor />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </AuthState>
      </ThemeProvider>
    </>
  );
}

export default App;
