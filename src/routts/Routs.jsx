import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import AdminHome from "../Admin/Home/AdminHome"
import SkillsAdmin from "../Admin/Skills/SkillsAdmin"
import Hoobies from "../Admin/Hobbies/Hoobies"
import ProjeactEdit from "../Admin/ProjeactAdmin/ProjeactEdit"
import BLoge from "../Admin/Bloge/BLoge"
import Monial from "../Admin/TEstmonial/Monial"
import ContactPage from "../Admin/Contact"




// import Sidebar from "../Admin/Navbar"


const Routs = () => {
    const admin = localStorage.getItem("id")
  return (
    <div>

      <BrowserRouter >
<Routes>
  <Route path="/" element={<App/>}/> 
 



</Routes>
{admin && 
    <Routes>
  
 


  <Route path="/admin" element={<AdminHome/>}/>
  <Route path="/skill" element={<SkillsAdmin/>}/>
  <Route path="/moreInfo" element={<Hoobies/>}/>
  <Route path="/projeact" element={<ProjeactEdit/>}/>
  <Route path="/blog" element={<BLoge/>}/>
  <Route path="/cmd" element={<Monial/>}/>
  <Route path="/contact" element={<ContactPage/>}/>   
</Routes>
}
</BrowserRouter>
    </div>
  )
}

export default Routs
