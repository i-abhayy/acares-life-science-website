import divocare from "@/assets/divocare.jpg.asset.json";
import leviac from "@/assets/leviac.jpg.asset.json";
import calcam from "@/assets/calcam.jpg.asset.json";
import oxi600 from "@/assets/oxicare600.jpg.asset.json";
import oxi450 from "@/assets/oxicare450.jpg.asset.json";

export const COMPANY = {
  name: "ACARES Life Science Pvt. Ltd.",
  addressLines: ["House no.53, 1/5 street - opposite Manakwal gate,", "Satjot Nagar", "Ludhiana -141013, Punjab"],
  phone: "7033027878",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Our Products" },
  { to: "/approach", label: "Our Approach" },
  { to: "/quality", label: "Quality" },
  { to: "/contact", label: "Contact" },
] as const;

export const FOOTER_EXTRA = [{ to: "/careers", label: "Careers" }] as const;

export type Product = {
  slug: string;
  name: string;
  composition: string;
  category: "Neurology" | "Nutritional Supplements";
  pack: string;
  prescription: boolean;
  image: string;
  imageW: number;
  imageH: number;
};

// Only details legible on the supplied product posters are recorded here.
export const PRODUCTS: Product[] = [
  { slug: "divocare-od-500", name: "Divocare OD 500", composition: "Divalproex Sodium Extended-Release Tablets IP", category: "Neurology", pack: "10 x 10 Tablets", prescription: true, image: divocare.url, imageW: 1448, imageH: 1086 },
  { slug: "leviac-500", name: "Leviac-500", composition: "Levetiracetam Tablets IP", category: "Neurology", pack: "10 x 10 Tablets", prescription: true, image: leviac.url, imageW: 724, imageH: 544 },
  { slug: "calcam-k2", name: "Calcam-K2", composition: "Calcium Citrate Malate, Zinc, Magnesium, Vitamin K2-7 & Vitamin D3 Tablets", category: "Nutritional Supplements", pack: "10 x 10 Tablets", prescription: false, image: calcam.url, imageW: 528, imageH: 467 },
  { slug: "oxicare-600", name: "Oxicare-600", composition: "Oxcarbazepine Tablets IP", category: "Neurology", pack: "10 x 10 Tablets", prescription: true, image: oxi600.url, imageW: 460, imageH: 467 },
  { slug: "oxicare-450", name: "Oxicare-450", composition: "Oxcarbazepine Tablets IP", category: "Neurology", pack: "10 x 10 Tablets", prescription: true, image: oxi450.url, imageW: 522, imageH: 467 },
];

export const CATEGORIES = ["All", "Neurology", "Nutritional Supplements"] as const;

export const WHAT_WE_DO =
  "Our extensive portfolio includes products in all major therapeutic areas. These include medicinal products aimed at the treatment of infections, cardiovascular disease, analgesics, drugs for the treatment of cancer and diseases of the central nervous system, medicinal products aimed at women's health, and drugs for the treatment of the digestive tract.";

export const MISSION = [
  "To be a centre of excellence in healthcare and wellness sectors providing high quality, safe and effective products to meet customer needs.",
  "To give the highest priority to our customers, colleagues and the environment.",
  "To manage growth based on principles of sustainable development to support the communities in which we do business.",
  "The continual quest for market leadership will be driven by excellence in manufacturing and product development.",
];

export const VISION = [
  "Our vision is to excel in domestic and export markets in an efficient and quality-conscious manner.",
  "To become a leading pharmaceutical company in India and to be a significant global player.",
  "Our vision is to achieve sustainable competitive advantage through leadership in human care products and cosmetic products, with excellence in environment, health, quality, efficacy and safety.",
];

export const THERAPY_AREAS = [
  "Cardiovascular diseases", "Respiratory diseases", "Oncology", "Urology", "Pain",
  "Nephrology", "Women's health", "Infections and fungi", "Hormonal imbalance",
  "Central nervous system", "Gastrointestinal diseases",
];
