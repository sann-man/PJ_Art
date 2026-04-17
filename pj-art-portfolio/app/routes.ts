import { index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("gallery", "routes/gallery.jsx"),
    route("about", "routes/about.jsx"),
    route("contact", "routes/contact.jsx"),
    route("login", "routes/login.jsx"),
    route("admin", "routes/admin.jsx"),
    route("api/create-checkout-session", "routes/api/create-checkout-session.js"),
    route("success", "routes/success.jsx"),
] satisfies RouteConfig; 