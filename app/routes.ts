import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/default.tsx", [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
