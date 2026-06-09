import axios from 'axios';
import * as cheerio from 'cheerio';

async function main() {
  try {
    const { data } = await axios.get('https://gk-mechti.ru/catalog', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    console.log('--- PAGE TITLE ---');
    console.log($('title').text());
    
    console.log('\n--- H1, H2, H3 ---');
    $('h1, h2, h3').each((i, el) => {
      console.log(`${el.tagName}: ${$(el).text().trim()}`);
    });

    console.log('\n--- Links to Catalog Items ---');
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && (href.includes('/catalog/') || href.includes('catalog'))) {
        console.log(`Href: ${href} | Text: ${text}`);
      }
    });

    // Let's print out text that contains catalog descriptions or cards
    console.log('\n--- Card elements or probable grids ---');
    $('[class*="card"], [class*="item"], [class*="product"], [class*="object"]').each((i, el) => {
      const cls = $(el).attr('class');
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text.length > 20 && text.length < 500) {
        console.log(`Class: ${cls} | Text: ${text.substring(0, 150)}`);
      }
    });

  } catch (error: any) {
    console.error('Error fetching/parsing page:', error.message);
  }
}

main();
