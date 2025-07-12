import { Link } from 'react-router-dom'
import Headshot from '../assets/headshot.png'
import Navbar from '../components/navbar' 

export default function About() { 
    return (
        <div className="">
            <Navbar />
            <div className="flex absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 
                            w-4/6 lg:h-3/4 md:h-1/2 gap-10 ">
                <div className="flex-2/3">
                    <img src={Headshot} alt="" className=' max-h-[35em] rounded-xl'/>
                </div>
                <div id = "" className="flex-2/3 text-white">
                    <h1 className = 'text-4xl text-white font-bold'>About Me</h1>
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quasi, iste porro modi minus 
                        suscipit magnam. Laborum aspernatur quibusdam repudiandae nisi incidunt 
                        ab labore veniam vitae reiciendis est, nobis corporis!</h1>
                    <img src="" alt="" />
                    <div className="grid grid-cols-4 gap-4 mt-10 text-white">
                        <span className='border p-4 max-h-fit items-center rounded-full flex justify-center'>I</span>
                        <span className='border p-4 max-h-fit items-center rounded-full flex justify-center'>Y</span>
                        <span className='border p-4 max-h-fit items-center rounded-full flex justify-center'>L</span>
                        <span className='border p-4 max-h-fit items-center rounded-full flex justify-center'>G</span>
                    </div>
                </div>
                
            </div>
            
        </div>
    ); 
}

