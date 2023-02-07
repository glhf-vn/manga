// ref: https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps

import type { GetServerSideProps } from "next";
import type { Serie } from "@data/public.types";

import slug from "slug";

const SERIES_DATA = "https://manga.glhf.vn/api/series";
const SERIES_URL = "https://manga.glhf.vn/license";

function generateSiteMap(series: Serie[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://manga.glhf.vn</loc>
     </url>
     <url>
       <loc>https://manga.glhf.vn/donate</loc>
     </url>
     <url>
       <loc>https://manga.glhf.vn/listing</loc>
     </url>
     <url>
       <loc>https://manga.glhf.vn/license</loc>
     </url>
     ${series
       .map(({ id, name }) => {
         return `
       <url>
           <loc>${`${SERIES_URL}/${id}/${slug(name)}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const request = await fetch(SERIES_DATA);
  const series: Serie[] = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(series);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
