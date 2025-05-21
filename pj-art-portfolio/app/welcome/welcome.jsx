import { MdOutlinePhotoSizeSelectActual, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

const mainImages = {
  img1: image1,
  img2: image2,
  img3: image3,
  img4: image4,
};

function DispMainContent({ images }) {
  return (
    <div className="">
      <div className="p-10 flex md:h-[35em] lg:h-[40em] gap-4">
        {Object.entries(images).map(([key, value], index) => (
          <div 
            key={key} 
            className={`flex h-full overflow-hidden rounded-xl transition-all duration-300 
                      ease-in-out group-hover:flex-grow hover:flex-[2] flex-[1] img-slide-${index + 1}`}
          >
            <img 
              src={value} 
              alt={key} 
              className="cursor-pointer border-2 border-gray-900 rounded-xl h-full object-cover duration-200
                       hover:ease-in-out hover:w-[1000em]" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Welcome() {
  return (
    <main className="">
      <Navbar />
      <div className="w-full h-full m-0"></div>
      <div className="-mt-2 text-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
                    lg:w-3/5 md:w-10/12">
        <h1 className='text-6xl text-white'>PRYCE JONES ART</h1>
        <div className=""></div>
        <div id='main-imgs'>
          <DispMainContent images={mainImages} />
        </div>
        <button 
          id='gallery-btn' 
          className=" font-mono rounded-xl p-2 text-md w-24 transition-all duration-200 ease-in-out
                  cursor-pointer bg-transparent border hover:scale-110 text-white hover:shadow-2xl shadow-lg shadow-neutral-700"
        >
          <Link to="/gallery">GALLERY</Link>
        </button>
      </div>
    </main>
  );
}