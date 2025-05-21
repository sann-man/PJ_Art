import { index, route, type RouteConfig} from "@react-router/dev/routes"; 

export default [
    index("routes/home.jsx"), 
    route("gallery", "routes/gallery.jsx"), 
    route("about", "routes/about.jsx")
] satisfies RouteConfig; 