import { type RouteConfig, route, index } from "@react-router/dev/routes";
export default [
    route("/", "components/layout.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("workshops", "routes/workshops.tsx"),
        route("privateBookings", "routes/privateBookings.tsx"),
        route("consulting", "routes/consulting.tsx"),
        route("guides", "routes/guides.tsx"),
        route("blog", "routes/blog.tsx"),
        route("contactUs", "routes/contactUs.tsx")
      ])
    ] satisfies RouteConfig;