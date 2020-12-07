import React from 'react';
import { GraphQLClient } from 'graphql-request'

const SITE_URL = 'https://devardha.vercel.app';

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${SITE_URL}`}</loc>
        </url>
        <url>
            <loc>${`${SITE_URL}/about`}</loc>
        </url>
        ${posts
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${SITE_URL}/${slug}`}</loc>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master');
        const { posts } = await graphcms.request(
            `
            {
                posts{
                    slug,
                }
            }
            `
        )

        res.setHeader("Content-Type", "text/xml");
        res.write(createSitemap(posts));
        res.end();
    }
}

export default Sitemap;