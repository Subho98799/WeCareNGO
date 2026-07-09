export type GalleryCategory =
  | "All"
  | "Children Education"
  | "Women Empowerment"
  | "Animal Welfare"
  | "Other Initiatives";

export interface CuratedEntry {
  type: "photo" | "video";
  src: string;
  poster?: string;
  title: string;
  category: GalleryCategory;
  aspect: "landscape" | "portrait";
  duration?: string;
}

const curation: CuratedEntry[] = [
  // ── HERO MOMENTS ─────────────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/at-wecares-bachpanshala-education-goes-beyond-textbooks-our-holistic-approach-nu--DH1CF3BoaIm-01-gallery.webp",
    title: "Learning with joy, growing together",
    category: "Children Education",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/he-came-here-as-a-quiet-little-boy--DaQW2HbTlK9-01-gallery.webp",
    title: "A quiet boy who found his voice",
    category: "Children Education",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/precious-smiles-curious-minds-and-eyes-full-of-dreams--CZwsLWVvswf-01-gallery.webp",
    title: "Eyes full of dreams",
    category: "Children Education",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/let-her-stay-free-from-shame-silence-stigma--DKPitkVIE-C-01-gallery.webp",
    title: "Let her stay free",
    category: "Women Empowerment",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/united-for-a-cause-distributing-1000-pads-to-support-menstrual-hygiene-in-collab--C7wVwA5pSCe-01-gallery.webp",
    title: "United for a cause",
    category: "Women Empowerment",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/because-every-soul-deserves-a-symphony-of-kindness-tiny-deeds-compose-the-melody--C3kgnCwPakn-01-gallery.webp",
    title: "Kindness in every gesture",
    category: "Animal Welfare",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/children-carry-the-hopes-for-our-brighter-tomorrow-and-the-dreams-of-our-happy-f--CWQj2r7oTV1-01-gallery.webp",
    title: "Children carry the hopes of tomorrow",
    category: "Children Education",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/the-future-is-built-on-what-we-nurture-today-and-so-we-are-here-standing-with-th--CTunNrFoEV1-01-gallery.webp",
    title: "Nurturing a better tomorrow",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/its-always-with-the-little-ones-that-we-have-our-best-drives--CQtg9c9J1B6-01-gallery.webp",
    title: "With the little ones",
    category: "Children Education",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/heres-to-strong-women-may-we-know-them-may-we-be-them-may-we-raise-them--Ca2fLkaMa53-01-gallery.webp",
    title: "Here is to strong women",
    category: "Women Empowerment",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/wecare-volunteers-and-students-came-together-for-a-transformative-cleanliness-an--C9KsiF4PMGu-01-gallery.webp",
    title: "Volunteers in action",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/stray-cattle-and-other-animals-are-often-the-victims-of-rash-driving-mostly-duri--CjdXaUqpg1E-01-gallery.webp",
    title: "The ones we share our streets with",
    category: "Animal Welfare",
    aspect: "landscape",
  },

  // ── CHILDREN / EDUCATION ──────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/our-recent-art-and-craft-workshop-at-bachpanshala-took-young-explorers-on-a-jour--C5dyzLsPL58-01-gallery.webp",
    title: "Art and craft explorers",
    category: "Children Education",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/education-breeds-confidence-confidence-breeds-hope-hope-breeds-peace--Cdi4VefIVgC-01-gallery.webp",
    title: "Education breeds confidence",
    category: "Children Education",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/the-hands-work-while-the-heart-feeds--CFKSa0HJrq4-03-gallery.webp",
    title: "Hands that work, hearts that care",
    category: "Children Education",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/embark-on-a-strategic-journey-of-the-mind-as-young-minds-explore-the-intricate-w--C7CDQ19vK1j-01-gallery.webp",
    title: "Strategic young minds",
    category: "Children Education",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/in-the-classroom-of-bachpanshala-every-challenge-becomes-an-opportunity-for-grow--C3DZ7SmPgNO-01-gallery.webp",
    title: "Every challenge is an opportunity",
    category: "Children Education",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/our-day-was-all-about-cold-hands-and-warm-hearts-enjoyed-christmas-with-these-ki--CJOi9V9pfgC-05-gallery.webp",
    title: "Cold hands, warm hearts",
    category: "Children Education",
    aspect: "landscape",
  },

  // ── WOMEN EMPOWERMENT ────────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/let-her-stay-free-from-shame-silence-stigma--DKPitkVIE-C-03-gallery.webp",
    title: "A voice in the circle",
    category: "Women Empowerment",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/united-for-a-cause-distributing-1000-pads-to-support-menstrual-hygiene-in-collab--C7wVwA5pSCe-04-gallery.webp",
    title: "Receiving with dignity",
    category: "Women Empowerment",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/heres-to-strong-women-may-we-know-them-may-we-be-them-may-we-raise-them--Ca2fLkaMa53-04-gallery.webp",
    title: "Strength in sisterhood",
    category: "Women Empowerment",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/on-the-occasion-of-womens-day-we-did-a-skill-share-sessionwhere-we-put-up-stalls--Ca2bRrPsmm0-01-gallery.webp",
    title: "Skill share for empowerment",
    category: "Women Empowerment",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/for-some-it-is-a-privilege-for-others-its-a-rightthe-difference-between-darkness--CYrCdesPUfE-01-gallery.webp",
    title: "Not privilege, a right",
    category: "Women Empowerment",
    aspect: "portrait",
  },

  // ── ANIMAL WELFARE ───────────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/because-every-soul-deserves-a-symphony-of-kindness-tiny-deeds-compose-the-melody--C3kgnCwPakn-03-gallery.webp",
    title: "A bond of trust",
    category: "Animal Welfare",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/dogs-are-our-link-to-paradise--CWx0AvGvKdg-01-gallery.webp",
    title: "Our link to paradise",
    category: "Animal Welfare",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/dogs-are-our-link-to-paradise--CWx0AvGvKdg-03-gallery.webp",
    title: "Compassion has no species",
    category: "Animal Welfare",
    aspect: "landscape",
  },

  // ── COMMUNITY / ENVIRONMENT ───────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/from-awareness-to-action--DWCSdbhE1VR-01-gallery.webp",
    title: "From awareness to action",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/175-kg-plastic-waste-collected-at-manuabhan-tekri-under-jagriti-cleanliness-awar--DV7tZpvgoss-01-gallery.webp",
    title: "175 kg of plastic, one morning",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/175-kg-plastic-waste-collected-at-manuabhan-tekri-under-jagriti-cleanliness-awar--DV7tZpvgoss-05-gallery.webp",
    title: "Proud of the work done",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/plant-a-tree-and-plant-hope-for-future--CUiEpt9o4tK-01-gallery.webp",
    title: "Plant a tree, plant hope",
    category: "Other Initiatives",
    aspect: "portrait",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/someone-is-sitting-in-the-shade-today-because-someone-planted-a-tree-long-time-a--CUiFTLyIyyn-01-gallery.webp",
    title: "The shade of a tree planted today",
    category: "Other Initiatives",
    aspect: "portrait",
  },

  // ── SPORTS / CHARITY CUP ─────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/introducing-teams--C1OWzCWPXQS-01-gallery.webp",
    title: "Introducing the teams",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/here-are-some-glimpse-of-playoff-gamesteams-showed-extreme-passion-and-dedicatio--Cm1o9eIvNQu-03-gallery.webp",
    title: "Playoff passion",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/the-finale-was-a-victory-only-with-the-presence-of-our-humble-chief-guests-for-t--CYB3nyLv4Ke-01-gallery.webp",
    title: "Victory and gratitude",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/we-care-family-acknowledged-the-work-of-our-real-life-heroes-who-are-always-ther--CPa9NqcpkOp-01-gallery.webp",
    title: "Our real-life heroes",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/with-that-we-conclude-our-very-first-fundraising-football-tournament-we-extend-o--CX_wG25PDac-01-gallery.webp",
    title: "A tournament to remember",
    category: "Other Initiatives",
    aspect: "landscape",
  },

  // ── THE PEOPLE BEHIND IT ──────────────────────────────────────
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/we-are-elated-to-introduce-the-driving-forces-behind-the-we-care-charity-cup-30--C1JShGOPdtC-01-gallery.webp",
    title: "The driving forces",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/gratitude-in-every-frame-reflecting-on-the-moments-that-defined-we-care-charity--C1pNywSPe-0-01-gallery.webp",
    title: "Gratitude in every frame",
    category: "Other Initiatives",
    aspect: "landscape",
  },
  {
    type: "photo",
    src: "/site-media/website_media/gallery/large/clothed-in-care-walking-in-hope-each-shirt-lower-and-pair-of-shoes-given-to-the--DDFMQRwvOXd-01-gallery.webp",
    title: "Clothed in care, walking in hope",
    category: "Other Initiatives",
    aspect: "portrait",
  },

  // ── VIDEOS ────────────────────────────────────────────────────
  {
    type: "video",
    src: "/site-media/website_media/videos/he-came-here-as-a-quiet-little-boy-video.mp4",
    poster: "/site-media/website_media/covers/large/he-came-here-as-a-quiet-little-boy--DaQW2HbTlK9-cover.webp",
    title: "A quiet boy who found his voice",
    category: "Children Education",
    aspect: "landscape",
    duration: "0:24",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/4-years-of-we-care-a-journey-of-hope-and-heart-video.mp4",
    poster: "/site-media/website_media/covers/large/4-years-of-we-care-a-journey-of-hope-and-heart--C_nyI1tRS_e-cover.webp",
    title: "Four years of hope and heart",
    category: "Other Initiatives",
    aspect: "landscape",
    duration: "0:45",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/we-care-turns-five-video.mp4",
    poster: "/site-media/website_media/covers/large/we-care-turns-five--DOYfvf_jL2w-cover.webp",
    title: "WeCare turns five",
    category: "Other Initiatives",
    aspect: "landscape",
    duration: "1:02",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/mental-health-matters-video.mp4",
    poster: "/site-media/website_media/covers/large/mental-health-matters--Cj0fAIwv-Mm-cover.webp",
    title: "Mental health matters",
    category: "Other Initiatives",
    aspect: "landscape",
    duration: "0:38",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/stray-cattle-and-other-animals-are-often-the-victims-of-rash-driving-mostly-duri-video.mp4",
    poster: "/site-media/website_media/covers/large/stray-cattle-and-other-animals-are-often-the-victims-of-rash-driving-mostly-duri--CjdXaUqpg1E-cover.webp",
    title: "The victims of our roads",
    category: "Animal Welfare",
    aspect: "landscape",
    duration: "0:28",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/glimpses-from-the-road-safety-awareness-campaign-that-you-must-see-this-friday-e-video.mp4",
    poster: "/site-media/website_media/covers/large/glimpses-from-the-road-safety-awareness-campaign-that-you-must-see-this-friday-e--Cjsq6q8pH2F-cover.webp",
    title: "Road safety awareness",
    category: "Other Initiatives",
    aspect: "landscape",
    duration: "0:18",
  },
  {
    type: "video",
    src: "/site-media/website_media/videos/we-recently-spent-the-day-at-wecareorgg-bachpanshala-conducting-our-compassionat-video.mp4",
    poster: "/site-media/website_media/covers/large/we-recently-spent-the-day-at-wecareorgg-bachpanshala-conducting-our-compassionat--DaSi2yjssoK-cover.webp",
    title: "A day at Bachpanshala",
    category: "Children Education",
    aspect: "landscape",
    duration: "0:15",
  },
];

export default curation;

export const editorialImages = curation.filter((e) => e.type === "photo");
export const videos = curation.filter((e) => e.type === "video");

export const programCategories: GalleryCategory[] = [
  "All",
  "Children Education",
  "Women Empowerment",
  "Animal Welfare",
  "Other Initiatives",
];
