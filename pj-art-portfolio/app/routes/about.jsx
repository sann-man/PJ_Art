import { Link } from 'react-router-dom'
import { MdEmail, MdPhone, MdLocationOn, MdPalette } from 'react-icons/md'
import Headshot from '../assets/headshot.png'
import Navbar from '../components/navbar' 

export default function About() { 
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20 md:pt-24 pb-12 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className='text-3xl md:text-4xl lg:text-6xl text-white font-mono mb-4 gradient-text text-shadow-glow'>ABOUT THE ARTIST</h1>
                        {/* <p className="text-gray-300 text-lg">Exploring the intersection of emotion and visual expression</p> */}
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
                        <div className="flex-1 w-full max-w-md lg:max-w-none">
                            <div className="relative group flex items-center justify-center">
                                <img 
                                    src={Headshot} 
                                    alt="Pryce Jones headshot" 
                                    className='w-3/4 h-auto max-h-[35em] rounded-2xl object-cover shadow-2xl image-hover-effect'
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        
                        <div className="flex-1 text-white text-center lg:text-left space-y-8">
                            <div>
                                <h2 className='text-2xl md:text-3xl font-bold mb-4 gradient-text'>Pryce Jones</h2>
                                <p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-6'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur cumque consequatur excepturi itaque animi, asperiores, possimus, 
                                    debitis illo similique ab consequuntur optio cupiditate! 
                                </p>
                                <p className='text-base md:text-lg text-gray-400 leading-relaxed mb-8'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, earum est quibusdam minima tempore natus ducimus nisi a, soluta 
                                    quia quo voluptatem eligendi sed corrupti nesciunt modi cum repellat incidunt! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                  
                                </p>
                            </div>
                            
                            {/* <div className="glass-effect p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MdPalette className="text-white" />
                                    Artistic Focus
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-gray-300">
                                        <p className="font-semibold text-white mb-1">Medium</p>
                                        <p>Art styles / desc. here</p>
                                    </div>
                                    <div className="text-gray-300">
                                        <p className="font-semibold text-white mb-1">Style</p>
                                        <p>Desc or tag line here</p>
                                    </div>
                                    <div className="text-gray-300">
                                        <p className="font-semibold text-white mb-1">Years Active</p>
                                        <p>2018 - Present</p>
                                    </div>
                                    <div className="text-gray-300">
                                        <p className="font-semibold text-white mb-1">Location</p>
                                        <p>Location or something here</p>
                                    </div>
                                </div>
                            </div> */}
                            
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link to="/gallery" className="modern-button px-6 py-3 rounded-xl font-mono text-white hover:scale-105 transition-all duration-300">
                                    View Gallery
                                </Link>
                                <Link to="/contact" className="modern-button px-6 py-3 rounded-xl font-mono text-white hover:scale-105 transition-all duration-300">
                                    Commission Work
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="mt-16 pt-12 border-t border-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">50+</div>
                                <div className="text-gray-300">Artworks Created</div>
                            </div>
                            <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">12</div>
                                <div className="text-gray-300">Exhibitions</div>
                            </div>
                            <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">100+</div>
                                <div className="text-gray-300">Collectors</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    ); 
}