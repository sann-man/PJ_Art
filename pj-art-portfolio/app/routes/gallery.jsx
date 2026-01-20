import { useState, useEffect } from "react";
import { MdClose, MdShoppingCart } from "react-icons/md";
import Navbar from "../components/navbar";
import { useCart } from "../components/cart-context";
import { supabase } from "../../supabaseClient";

async function getImagesFromDatabase() {
  const { data, error } = await supabase
    .from('images')
    .select('*')

  if (error) {
    console.error('Error fetching from database:', error)
    return []
  }

  // Convert file_path to full public URL
  const imagesWithUrls = data.map(image => ({
    ...image,
    image_url: supabase.storage.from('images').getPublicUrl(image.file_path).data.publicUrl
  }))

  return imagesWithUrls
}

export default function Gallery() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    async function loadImages() {
      const fetchedImages = await getImagesFromDatabase();
      setImages(fetchedImages);
      setLoading(false);
    }
    loadImages();
  }, []);

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  const handleAddToCart = () => {
    if (modalImage) {
      addItem(modalImage);
      closeModal();
    }
  };

  return (
    <main className="text-white min-h-screen">
      <Navbar />

      <div className="pt-20 md:pt-24 pb-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-mono gradient-text text-shadow-glow">GALLERY</h1>
            <p className="text-gray-300 mt-4 text-lg">Explore the collection of contemporary artworks</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-300">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {images.map((image) => (
              <div key={image.id} className="group cursor-pointer" 
                   onClick={() => openModal(image)}>
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <img
                    src={image.image_url}
                    alt={image.name}
                    className="rounded-xl object-cover h-full w-full image-hover-effect transition-all duration-500"
                    style={{pointerEvents: 'none'}}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end pointer-events-none">
                    <div className="p-4 text-white w-full">
                      <h3 className="font-bold text-sm mb-1">{image.name}</h3>
                      <p className="text-lg font-bold">${image.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Simple Modal */}
      {showModal && modalImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] glass-effect rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            >
              <MdClose className="text-white text-2xl" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="flex-1 p-4">
                <img
                  src={modalImage.image_url}
                  alt={modalImage.name}
                  className="w-full h-auto max-h-[60vh] lg:max-h-[70vh] object-contain rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="lg:w-80 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 gradient-text">{modalImage.name}</h3>
                <p className="text-gray-300 mb-4">{modalImage.description}</p>
                <p className="text-3xl font-bold mb-6">${modalImage.price}</p>

                <button
                  onClick={handleAddToCart}
                  className="modern-button w-full py-3 px-6 rounded-xl font-mono text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}