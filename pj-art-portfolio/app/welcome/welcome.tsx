

interface ImageMap{ [key: string]: string;}
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";


const mainImages: ImageMap= { 
  img1: 'https://images.unsplash.com/photo-1507187632231-5beb21a654a2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NGslMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D',
  img2: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg', 
  img3: 'https://wallpapercat.com/w/full/0/f/3/5815630-3840x2160-desktop-hd-4k-wallpaper-image.jpg' 
}

function DispMainContent({ images } : {images: ImageMap}) {
  return (
    <div className="grid grid-cols-4 shadow-2xl">
      
      {Object.entries(images).map(([key, value]) => (
        <div key = {key} className=" h-screen">
          <img src={value} alt={key} className = 'h-full w-full object-cover'/>
        </div >
      ))}
      <div className="flex justify-center">
        <div className="w-full flex flex-col items-center text-center justify-between">
          <h1 className='text-7xl mt-32'>Pryce Jones Art</h1> 
          <div className="flex flex-col items-center">
            <h1 className =  'text-2xl'>Gallery</h1>
            <MdOutlinePhotoSizeSelectActual className = 'text-7xl p-2 ' /> 
          </div>
          <div id='headshot' className="border w-full m-0 p-0 items-center align-center flex">
            <img   src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  
  ); 
}

export function Welcome() {
  return (
    <main className="">
      {/* navbar */}
      <div id = 'nav-bar' className="w-full m-0 p-8 absolute bg-black" >
        <ul className="flex gap-10 text-xl">
          <li>PJ Art</li>
          <li>Gallery</li>
          <li>About</li> 
          <li>Contact</li>
          <div className="">
            {}
            {}
          </div>
        </ul>
      </div>

      <div id = 'main-imgs' className="">
        <DispMainContent images={mainImages} />
      </div> 

   
    </main>
  );
}

