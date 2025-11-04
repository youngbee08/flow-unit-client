import darkTextLogo from '/dark_logo-nobg.png'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'


const Header = ({userName,accttype,navs,shouldSearch=false,buttons})=>{
  return (
    <header className={`flex justify-between items-center text-white font-medium lg:w-full px-4 py-5 h-fit sticky top-0 z-10 ${window.addEventListener("scroll", ()=> window.scrollY > 50 ? "border-b border-b-[#021a3c]" : "border-b-0")}`}>
      <div className="w-[30%] flex items-center">
        <img src={darkTextLogo} alt="darklogo" className='w-[30%] h-[50px] object-cover'/>
        <div className="flex gap-4 items-center w-full">
          {/* <p className='font-thin'>/</p> */}
          <h2>{userName}</h2>
          <h4 className='bg-[#0D70FC] px-2 rounded font-medium'>{accttype}</h4>
        </div>
      </div>
      {
        navs?.map((nav,index) =>(
          <nav className='flex gap-3 w-[45%]' key={index}>
            <Link to={nav.path}>{nav.name}</Link>
          </nav>
        ))
      }
      <div className="flex gap-3">
        {
          shouldSearch ? (
            <div className="text-[#70acfa] flex items-center gap-3 border border-[#70acfa] p-2 rounded">
              <Search color='#b8d5fc' size={17}/>
              <input type="text" placeholder='Find Task' className='outline-0 border-0 text-[15px] font-medium'/>
            </div>
          ):null
        }
        {
          buttons?.map((button,key)=>(
            <Link to={button.path} className={`${button.name === "Sign Up" ? "border-2 border-[#0D70FC]" : button.name === "Contact" ? "border-2 border-[#0D70FC]" : "bg-[#0D70FC] text-[#000F19]"} flex items-center justify-center cursor-pointer w-full px-4 py-2 rounded text-[14px] transition-all`} key={key}>{button.name}</Link>

          ))
        }
      </div>
    </header>
  )
};

export default Header