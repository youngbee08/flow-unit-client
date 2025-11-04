import React, { useState } from 'react'
// import { toast } from 'sonner'

import Header from "../components/UI/Header"
// import { useNavigate } from 'react-router-dom';
import Verify from '../components/section/Verify';

const Index = () => {
  const [shouldRegister,setShouldRegister] = useState(false);
  const [toggleVerify, setToggleVerify] = useState(false);
  const [username,setUsername] = useState('');
  const [accountType,setAccountType] = useState('');
  const [email,setEmail] = useState('');
  // const navigate = useNavigate();
  const buttons = [
    {
      name:"Contact",
      path:"contact"
    },
    {
      name:"Log In",
      path:"login"
    },
  ];

  const accType = [
    {
      name:"Delegator",
      desc:"I assign tasks and oversee their progress.",
      color:"#0D70FC"
    },
    {
      name:"Executor",
      desc:"I complete tasks and update progress.",
      color:"#000F19"
    }
  ];

  const handleAccountType = ()=>{
    if (accountType !== '') {
      alert(`Hello ${accountType} ${username}`)
      setShouldRegister(true)
    }
  };

  const handleRegister = (e)=>{
    e.preventDefault()
    if (email !== "") {
      setToggleVerify(true)
    }
  };
  

  return (
    <div className=''>
      <Header buttons={buttons}/>
      {
        !toggleVerify ? (
          <div className="flex flex-col border border-[#0D70FC] bg-[#0e2432] text-white w-[90%] lg:w-[40%] mx-auto mt-[5rem] p-[2rem] rounded-2xl gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl lg:text-3xl font-semibold w-full text-center mx-auto">Your first task is just a sign-up away.</h2>
              {
                !shouldRegister ? (
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs lg:text-[14px] font-medium">Account Type</h4>
                      <div className="flex flex-col gap-3 border rounded-[7px] p-4 border-[#0D70FC]">
                        {
                          accType.reverse().map((type,key) =>(
                            <div key={key} className="flex gap-3 items-start lg:items-center justify-between">
                              <div className="flex justify-between gap-3 items-center">
                                <input type="radio" name="same" className="typeRadios" onClick={()=> setAccountType(type.name)}/>
                                <h4 className="text-xs lg:text-[14px] font-medium">{type.desc}</h4>
                              </div>
                              <h5 className={`text-xs bg-[${type.color}] p-[.2rem] font-medium rounded`}>{type.name}</h5>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    {
                      accountType === "" ? null :(
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-[14px] font-medium">{accountType === "Delegator" ? "Organization Name" : accountType === "Executor" ? "Your Name" : ""}</label>
                          <input type="text" name="name" className="border border-[#0D70FC] rounded p-2 outline-0" onInput={(e)=> setUsername(e.target.value)}/>
                        </div>
                      )
                    }
                    <button className={`bg-[#0D70FC] rounded p-3 font-medium text-xs lg:text-base cursor-pointer`} disabled={username === "" ? true : false} onClick={handleAccountType}>Continue</button>
                  </div>
                ): (
                  <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="text-[14px] font-medium">Email</label>
                      <input type="text" name="name" className="border border-[#0D70FC] rounded p-2 outline-0" onInput={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <button className={`bg-[#0D70FC] rounded p-3 font-medium text-xs lg:text-base cursor-pointer`} disabled={email === "" ? true : false}>Continue with Email</button>
                  </form>
                )
              }
            </div>
            <div className="flex flex-col w-full">
              <h4 className='font-medium text-xs lg:text-base w-full text-center'>By joining, you agree to our Terms of Service and Privacy Policy</h4>
            </div>
          </div>
        ): (<Verify email={email} returnAction={()=>setToggleVerify(false)} returnUrl={"overview"}/>)
      }
    </div>
  )
}

export default Index