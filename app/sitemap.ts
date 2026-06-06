import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vanyaarchitecture.com";
  const routes = ["", "/projects", "/about", "/services", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/projects" || route === "/services" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/projects" ? 0.9 : 0.8,
  }));
}
