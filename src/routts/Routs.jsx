import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"





// import Sidebar from "../Admin/Navbar"


const Routs = () => {

  return (
    <div>

      <BrowserRouter >
<Routes>
  <Route path="/" element={<App/>}/> 
 



</Routes>


</BrowserRouter>
    </div>
  )
}

export default Routs
