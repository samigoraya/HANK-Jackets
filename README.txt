HANK website – CLEAN URL VERSION (for Cloudflare Pages)

URLS
Pages open without .html:  /  /products  /our-story  /shipping-returns  /contact-us  /bomber-jacket-black ...
Cloudflare Pages automatically forwards the old /our-story.html to /our-story (308), and /index.html to /. No extra config file is needed.
Canonical tags, og:url, JSON-LD and sitemap.xml already use the clean URLs.
Assets are linked from the site root (/style.css, /app.js, /img/...), so this version works on a server (Cloudflare Pages or any host with the same rules).
It will NOT look right if you double-click index.html from the zip. Use the other zip (hank-website.zip) for that.

HOW TO PUT IT ONLINE (CLOUDFLARE PAGES)
1. Cloudflare dashboard > Workers & Pages > Create > Pages > Upload assets.
2. Upload the CONTENTS of this folder (index.html, style.css, app.js, img/ ... at the top level, not inside another folder).
3. After the first deploy, add your domain under Custom domains.
4. Replace the placeholder domain  https://your-domain.pk  with your real domain in every .html file, sitemap.xml and robots.txt (find-and-replace), then upload again.
5. Submit  https://your-real-domain/sitemap.xml  in Google Search Console.

PRICE AND OFFER
Jacket price Rs. 5,800, crossed-out price Rs. 8,300 (30% off, save Rs. 2,500). Shipping is free on every order in Pakistan.
These numbers appear in many files; to change them, find-and-replace "5,800", "8,300", "2,500" and "5800", "8300" in the .html files and sitemap/app.js.

STILL SAMPLE – replace with real details
- Contact page and footer: hello@hank.pk, WhatsApp 0300-0000000
- "Only N left" stock numbers on the Blue and Dark Green jacket pages (remove or make them real)
- Size guide measurements (chest/length)
- Order, contact and newsletter forms do not send anything yet (they only show a thank-you). Connect them to your order/email system.

PAGES
index.html, products.html (all products), bomber-jacket-black|blue|navy|red|white|dark-green.html, our-story.html, shipping-returns.html, contact-us.html, 404.html
Shared: style.css, app.js (cart saves in the visitor's browser), sitemap.xml, robots.txt, img/
