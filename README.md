# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## This folder (ACARES Life Science website source)

What's inside:

- `src/routes/` — one file per page: Home, About Us, Our Products, product details, Our Approach, Quality, Contact, Careers, plus the hidden admin page.
- `src/components/` — the header, footer, product showcase, enquiry form and the tilt/animation effects.
- `src/lib/site.ts` — all the words: company details, menu, product list, mission, vision, therapy areas. Edit copy here.
- `src/styles.css` — colours and fonts.
- `src/assets/` — pictures and clips. `public/assets/` holds the full-size image and video files the pages load.
- `drizzle/migrations/` — the database changes (admin access, mission-video settings).
- `supabase/config.toml` — backend settings.
- `.env` — the project's public web address and publishable key only. No private keys are in this folder.

Run it:

```sh
npm install
npm run dev
```

Then open http://localhost:8080. `npm run build` makes the production files.

Notes:

- The admin page lives at `/admin`. Only people listed as site admins can change the mission video there.
- The enquiry and careers forms save enquiries to the database; they do not send email.
- Pictures and clips the site shows are included in `public/assets/`. Videos an admin uploads later through `/admin` are stored in the hosted backend, not in this folder.
