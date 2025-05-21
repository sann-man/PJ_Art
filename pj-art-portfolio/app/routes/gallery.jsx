import { use, useState } from "react";
import Navbar from "../components/navbar";
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import image7 from '../assets/image7.png';
import image8 from '../assets/image8.png';
import image9 from '../assets/image9.png';
import image10 from '../assets/image10.png';

// import image7 from '../assets/image7.png';


const mainImages = {
  img1: image1, 
  img2: image2,
  img3: image3,
  img4: image4,
  img5: image5, 
  img6: image6, 
  img7: image7, 
  img8: image8, 
  img9: image9, 
  img10: image10, 
};


function GalleryImages({images}){
  return (
    <div id = "gallery" className="grid lg:grid-cols-5 md:grid-cols-4 h-72 gap-4 ">
      {Object.entries(images).map(([key, value]) => (
        <div key = {key} className="">
          <img src={value} alt={key} className = 'rounded-md object-cover h-full w-full max-h-96' />
        </div>
      ))}
    </div>
  ); 
}


export default function Gallery(images) {

  const [isVisible, setIsVisible] = useState(false); 

  return (
    <main className=" text-white ">
      <Navbar /> 
      
      <div className="p-4 w-full absolute transfrom -translate-x-1/2 -translate-y-10/12 top-1/2 left-1/2">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-mono">GALLERY</h1>
        </div>
        <div className="pr-20 pl-20">
          <GalleryImages images={mainImages} />
        </div>
      </div>
    </main>
  );
}
