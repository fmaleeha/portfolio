import axios from "axios";
import { useEffect, useState } from "react";
import { SkillAPI } from "../API/API";
import { motion } from "framer-motion";

const Skill = () => {
  const [skill, setSkill] = useState([]);
  useEffect(() => {
    axios.get(SkillAPI)
      .then((res) => setSkill(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="skill" className="flex min-h-screen flex-col gap-10 text-2xl font-extrabold justify-center items-center  p-6">
      <div className="text-white">Skills</div>
      <div className=" grid gap-10 md:grid-cols-2">
        {skill.map((e) => (
          <div key={e.id} className="grid gap-10 grid-cols-2">
            <img src={e.img} alt={e.name} className="h-[100px] w-[100px] rounded-full" />
           <div className="flex  flex-col gap-2">
           <div className="text-white font-bold">{e.name}</div>
            <div className="w-full max-w-xs">
              
              <motion.div
                className="relative h-4 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: e.level }} // e.level should be a percentage string like "50%"
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 flex items-start bg-white justify-start pl-1 text-xs font-bold text-black">
                  {e.level}
                </div>
              </motion.div>
            </div>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
