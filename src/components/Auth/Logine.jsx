import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PasswordForm = () => {
    const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [message, setMessage] = useState('');
  const correctPassword = 'fmaleehamiya'; // Replace with your desired password

  const handleSubmit = () => {
   
    if (inputPassword === correctPassword) {
   
      localStorage.setItem("id",true)
    
      navigate("admin")
      window.location.reload()
      toast.success("welcome maleeha miya")
      setMessage('');
    } else {
        toast.warning("only for admin")

    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setInputPassword('');
    setMessage('');
  };

  return (
    <div className="">
      <div className="">
        {!isVisible ? (
          <button
            onClick={() => setIsVisible(true)}
            className="bg-blue-500  p-4 rounded hover:bg-blue-600"
          >
      
          </button>
        ) : (
          <div>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter password"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
            {message && (
              <div className={`mt-4 p-2 text-white ${message.includes('Incorrect') ? 'bg-red-500' : 'bg-green-500'} rounded`}>
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};




export default PasswordForm;
