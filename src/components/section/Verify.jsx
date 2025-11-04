import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = ({email,returnAction,returnUrl}) => {
  const [code, setCode] = useState(['', '', '', '', '','']);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const verifyCode = ()=>{
    alert("code")
    navigate(`/${returnUrl}`)
  };

  useEffect(() => {
    if (code[5] !== '') {
      setTimeout(() => {
        verifyCode()
      }, 200);
    }
  }, [code])
  

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="lg:mt-[3rem] bg-transparent flex items-center justify-center">
      <div className="text-white max-w-md w-full p-8 flex flex-col items-center">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4">Verification</h1>
        <p className="text-[14px] text-center lg:text-base mb-6">
          If you have an account, we have sent a code to {email}. Enter it below.
        </p>
        <div className="flex justify-start space-x-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="number"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 bg-[#0e2432] rounded-[7px] border-2 border-[#1d3646] text-white text-center text-xl focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <button className="text-blue-500 cursor-pointer flex items-center gap-1" onClick={returnAction}>
          <span>←</span>
          <p>Back</p>
        </button>
      </div>
    </div>
  );
};

export default Verify;