// src/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "ntfv4ffk",   // 👈 find in backend/sanity.config.js or sanity manage
  dataset: "production",          // usually "production"
  useCdn: true,                   // `true` for faster, cached responses
  apiVersion: "2023-01-01",       // use a fixed date
});

const builder = imageUrlBuilder(client);
export const urlFor=(source)=>(source ? builder.image(source).url(): "");
