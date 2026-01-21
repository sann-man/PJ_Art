import { MdOutlinePhotoSizeSelectActual, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
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
    <div className="p-2 md:p-4 flex flex-col items-center gap-2">
      <div className="flex flex-col sm:flex-row h-auto sm:h-[15em] md:h-[20em] lg:h-[20em] gap-3 w-full">
        {Object.entries(images).map(([key, value], index) => (
          <div 
            key={key} 
            className="rounded-xl transition-all duration-500 ease-in-out hover:flex-[2] flex-[1] min-h-[200px] sm:min-h-auto group"
          >
            <img 
              src={value} 
              alt={key} 
              className={`border cursor-pointer border-gray-800/50 rounded-xl object-cover h-full w-full img-slide-${index + 1} image-hover-effect`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Welcome() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20 min-h-screen flex flex-col justify-center items-center px-4 pb-12">
        <div className="text-center w-full max-w-5xl">
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-mono mb-3 mt-8 gradient-text text-shadow-glow float-animation'>
            PRYCE JONES
          </h1>
          <p className='text-xl text-gray-300 mb-4 fade-in-scale font-light tracking-wider'>
            Art
          </p>
          <div id='main-imgs'>
            <DispMainContent images={mainImages} />
            <div className="mb-8">
              <Link to="/gallery">
                <button
                  id='gallery-btn'
                  className="modern-button font-mono rounded-xl py-3 px-6 text-sm md:text-base transition-all duration-300 ease-in-out
                          cursor-pointer text-white mt-4 hover:scale-105"
                >
                  EXPLORE GALLERY
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}