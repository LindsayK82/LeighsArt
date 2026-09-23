
/* LEIGH WITHERELL — ARTWORK GALLERY */

const imageBase = "assets/images/";

/* COLLECTIONS */

const collections = {
  "sensuality-gallery": {
    folder: "Sensuality",
    files: [
      "God needs the Devil Image 3.jpg",
      "God+needs+the+Devil+Image+1.webp",
      "God+needs+the+Devil+Image+2.webp",
      "Longing+for+You.webp",
      "Tell+me+how...Image+10.webp",
      "Tell+me+how...Image+1.webp",
      "Tell+me+how...Image+2.webp",
      "Tell+Me+How...Image+3.webp",
      "Tell+Me+How...Image+4.webp",
      "Tell+Me+How...Image+5.webp",
      "Tell+me+how...Image+6.webp",
      "Tell+me+how...Image+7.webp",
      "Tell+me+how...Image+8.webp",
      "The+Bath.webp",
      "Villains.webp"
    ]
  },

  "melancholy-gallery": {
    folder: "Melancholy",
    files: [
      "Alli.webp",
      "Eric.webp",
      "Grief.webp",
      "Hidden+Wounds.webp",
      "Jim.webp",
      "The+Artist+Self+Reflection.webp"
    ]
  }
};

/* LIGHTBOX */

const lightbox = document.getElementById("art-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const closeButton = lightbox.querySelector(".lightbox-close");


function openArtwork(src, title) {
  const details = artworkDetails[title] || {};

  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;

  document.getElementById("lightbox-collection").textContent =
    details.collection || "";

  document.getElementById("lightbox-medium").textContent =
    details.medium || "";

  document.getElementById("lightbox-dimensions").textContent =
    details.dimensions || "";

  document.getElementById("lightbox-description").textContent =
    details.description || "";

  document.getElementById("lightbox-price").textContent =
    details.price || "";

  if (!lightbox.open) {
    lightbox.showModal();
  }
}

function closeArtwork() {
  lightbox.close();
}

closeButton.addEventListener("click", closeArtwork);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeArtwork();
  }
});

/* IMAGE TITLES */

function getTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/\+/g, " ")
    .replace(/ Image \d+$/i, "");
}

/* AUTOMATIC COLLECTION GALLERIES */

Object.entries(collections).forEach(([id, collection]) => {
  const gallery = document.getElementById(id);

  if (!gallery) return;

  collection.files.forEach(filename => {
    const imagePath =
      imageBase +
      encodeURIComponent(collection.folder) + "/" +
      encodeURIComponent(filename);

    const title = getTitle(filename);

    const button = document.createElement("button");
    button.className = "artwork";
    button.type = "button";
    button.setAttribute("aria-label", `Enlarge ${title}`);

    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = title;
    img.loading = "lazy";

    const caption = document.createElement("span");
    caption.className = "artwork-title";
    caption.textContent = title;

    button.append(img, caption);
    gallery.appendChild(button);

    button.addEventListener("click", () => {
      openArtwork(imagePath, title);
    });
  });
});

/* INDIVIDUALLY ADDED ORIGINAL WORKS */

document.querySelectorAll(".gallery-image").forEach(image => {

  // Allow keyboard access to each painting.
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute(
    "aria-label",
    `Enlarge ${image.alt || "artwork"}`
  );

  function enlargeImage() {
    const figure = image.closest("figure");
    const heading = figure?.querySelector("h3");
    const title = heading?.textContent || image.alt;

    openArtwork(image.src, title);
  }

  image.addEventListener("click", enlargeImage);

  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enlargeImage();
    }
  });
});

/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
}
const artworkDetails = {
  "The Secret Before Spring": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 × 18 inches",
    description: "Three young women gather in a quiet moment of confidence, framed by an interior of tapestry and gilded ornament, with a distant view of a Mediterranean village beyond the window. Their gestures - a lowered gaze, a hand raised to lips, an unspoken word - hold the tension of a secret suspended just before it is spoken. Rendered in acrylic on linen, the composition draws from classical portraiture while leaning into an emotional intimacy that feels distinctly modern: the interior world of women in the moment before something changes.",
    price: "$750.00"
  },
  "Margo in Conversation": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "10 x 10 inches",
    description: "In this compact painting, a quiet moment unfolds between a child and an object that holds silent significance. The figure, a young girl dressed in a soft blue garment, stands barefoot on a worn wooden floor, her attention fixed forward. Before her, a large teddy bear sits patiently beside a lamp whose green shade diffuses a gentle, warm light across the otherwise bare, beige walls. The simplicity of the scene emphasizes a subtle narrative, the unspoken conversation between innocence and comfort, presence and memory. The restrained size of the canvas invites an intimate viewing experience, as if stepping into a private space where vulnerability and quiet curiosity converge. The careful balance of light and shadow underscores the delicate nature of this encounter without distraction, allowing the viewer to witness a fleeting moment that feels both personal and universally familiar. Here, the ordinary objects and everyday setting gain an unexpected weight, suggesting layers of emotional resonance beneath their quiet surface.",
    price: "Available on request."
  },
  "The Archivist": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "16 x 16 inches",
    description: "In this intimate composition, a solitary woman is captured in a moment of deep immersion, her attention absorbed by the book she holds. The setting unfolds within an architectural space defined by smoothly carved stone arches and a gracefully spiraling wooden staircase that rises behind her. The interplay of textures—cool, muted stone paired with warm, polished wood—establishes a calm yet compelling atmosphere, inviting quiet reflection. The figure's thoughtful pose and restrained palette, highlighted by the delicate blue of her attire and earrings, evoke a sense of focused contemplation. Scattered books at her feet reinforce the theme of study and knowledge, suggesting a space where history and scholarship converge. Despite its modest scale, the work commands a presence that draws the viewer near, as though observing a private moment in a sanctuary of learning and memory. The balance of architectural detail and personal focus creates a layered narrative, quietly affirming the value found in dedication and discovery.",
    price: "$750.00"
  },
  "Where Ivy Climbs and Love Resides": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "14 x 14 inches",
    description: "This intimate scene unfolds within a quiet village corner, where two figures share a moment suspended in time. Their proximity speaks quietly of connection—an unspoken dialogue conveyed through gentle, attentive postures and the nearly touching of faces. The woman's flowing white dress, detailed with delicate lace, contrasts with the worn texture of the stone steps beneath them, while the man's simple, relaxed attire grounds the scene in approachable realism. Surrounding them, aged buildings rise with shutters painted in soft greens, their surfaces softened by climbing ivy that weaves quietly through the space. Light filters gently across the cobblestones, lending a natural softness that enhances the atmosphere without overwhelming it. This work balances the tangible and the tender, drawing the viewer into a serene, contemplative moment where affection and stillness coexist. The small scale of the canvas invites close attention, encouraging a personal engagement with the nuanced details and the quiet emotion that quietly pulses beneath the surface.",
    price: "SOLD (Giclée prints available — limited edition of 10)"
  },
  "Brother And Sister on a Blossomed Path": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "16 x 16 inches",
    description: "Brother and Sister on a Blossomed Path captures a quiet moment of connection between two children as they walk together along a flower-lined route. The painting is rendered in acrylic on a 16 by 16 canvas, employing a style that blends impressionistic touches with a focus on emotional nuance. The older child, clad in a simple white t-shirt and blue shorts, carries a small brown bag and gazes gently down at the younger sibling, who wears a soft blue dress. The figures are set against a backdrop of timeworn Mediterranean-style buildings, their surfaces marked by cracks and weathered textures that convey a sense of enduring presence and lived history. The composition thoughtfully balances the vibrant colors of the blossoming path with the muted earth tones of the aged structures, creating a layered atmosphere of warmth and tranquility. Above, the sky is rendered with bright hues and soft white clouds, enhancing the overall feeling of calm and optimism. Rather than focusing on exact likeness, the artwork emphasizes the tender interplay between the siblings, reflecting a universal theme of care and companionship. This piece invites viewers to pause and find meaning in the quiet bonds that shape everyday life.",
    price: "$750.00"
  },
   "Modern Apollo Against a Village Coastline": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "14 x 14 inches",
    description: "A solitary figure commands the foreground, his form rendered with careful attention to physical presence and subtle emotion. The warm tones of skin and the nuanced play of light and shadow articulate both strength and quiet vulnerability, while the details of a beard and tousled hair introduce a casual intimacy. His gaze, set deliberately off to the side, suggests contemplation or a moment paused between thought and action. Behind him, a coastal village unfolds with restrained precision—whitewashed buildings topped with red roofs stack gently along a hillside, meeting the sea beyond. The landscape balances realism with a measured stylization that supports the figure's prominence without distraction. Above, the sky shifts through a gradient of soft blues and muted golds, evoking the fragile boundary of dawn or dusk and lending the scene an unsettled calm. The compact dimensions of the piece magnify its intimate effect, focusing attention on the interplay of figure, environment, and light. This work captures a quietly powerful tension between rootedness and openness, inviting reflection on the complex expressions of identity set against a timeless, evocative place.",
    price: "$750.00"
  },
     "Modern Venus Rising": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "14 x 14 inches",
    description: "In this evocative composition, two figures emerge from the water's edge, their quiet closeness framed by an atmosphere charged with both serenity and subtle intensity. Their foreheads meet in a tender gesture that speaks to a moment suspended between connection and contemplation. The scene's calm waters ripple gently around them, reflecting hints of the fading sun and surrounding flora, where softness and motion coexist in delicate balance. The palette moves through warm, earthy tones softened by cool accents, drawing attention to the interplay of light across skin and water. Details such as the flower woven into the woman's hair and the shifting reflections beneath their feet enhance the sense of intimacy without overwhelming the composition. The resulting image reinterprets a timeless theme, inviting viewers to consider the enduring dialogue between presence, nature, and human connection within a quietly charged space.",
    price: "$750.00"
  },
      "Venus In Repose": {
    collection: "Original Works",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "14 by 14 inches",
    description: "Venus reposed by the Azure Sea presents a tranquil vision where classical elegance meets serene seascape. At its center, a reclining figure rests gently on a turquoise chaise lounge, her form draped in soft white fabric that contrasts with the vibrant upholstery beneath. Nearby, a poised cat adds a quiet, watchful presence, its alert posture balancing the relaxed demeanor of the figure. The scene unfolds against an architectural backdrop marked by stone pillars and an archway, framing a terrace that opens onto a calm sea. Distant sailboats drift along the horizon, while rugged cliffs anchor the vista with natural solidity. The composition uses a restrained palette of blues, whites, and warm earth tones to articulate a mood of quiet contemplation and subtle grace, inviting viewers to engage with both the human form and the environment it inhabits, where timeless beauty and gentle stillness converge.",
    price: "$750.00"
  },
      "Tell Me How...Image 10": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "36 x 36 inches",
    description: "This striking image captures the delicate interplay between resilience, strength, and vulnerability. The subjects are enveloped in a moment that blends intimacy with tension, illustrating the complexity of human relationships. The expression on the woman's face reveals a profound depth of emotion; her gaze reflects a mixture of apprehension and strength that speaks to her resilience in the face of vulnerability. The contrasting physical proximity of the figures creates an atmosphere charged with unspoken narratives, highlighting the multifaceted nature of their connection.",
    price: "$4,500.00"
  },
      "God Needs the Devil": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "In this painting, warmth rises like a slow flame behind the figures, bathing skin in ember tones and honeyed shadows. The woman's head tips back, eyes closed, mouth parted—not in performance, but in surrender to sensation. Light skims the curve of her throat and collarbone, turning the body into landscape: valleys of shadow, bright ridges of highlight, a map of pleasure that has not disappeared with time, only grown more nuanced and true. This work reads as your menopause journey not as a vanishing, but as a sharpening—an erotic clarity that arrives after the noise of expectation. The palette insists on heat, not fading; the posture insists on appetite, not apology. What's celebrated here is the continuity of women's sensuality: that the body changes, yes, but the capacity for pleasure, intimacy, and magnetism remains—sometimes deeper, sometimes bolder—alive in the present tense.",
    price: "$5,000.00"
  },
          "God Needs the Devil": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "22 x 24 inches",
    description: "As I stand before this painting in my series God Needs the Devil I feel a profound connection to the raw, unapologetic energy it embodies. The figure, draped in a loose shirt yet confidently exposed, challenges the age-old perceptions of female sexuality. Through her gaze, there is an invitation to explore one's own femininity without shame. This work is a celebration of the powerful essence that resides within women—a reminder that our sexuality is not a sin, but rather an integral part of who we are. It's a declaration that embracing one's sensuality is an act of strength, not weakness.",
    price: "$2,400.00"
  },
          "God Needs the Devil": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "36 x 36 inches",
    description: "This painting powerfully challenges the Jezebel stereotype surrounding women's sexuality, celebrating liberation and self-acceptance. It encourages women to embrace their desires without guilt, honoring their identities. By reclaiming our narratives and expressing our sexuality authentically, we foster a culture of empowerment that dismantles stigma and honors feminine power.",
    price: "$4,500.00"
  },
           "Longing For You": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "Absence made tangible. The ache of distance.",
    price: "$3,500.00"
  },
        "Tell Me How...Image One": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches",
    description: "This painting represents my deeply personal reflections on the vulnerability of women within the current political landscape in the United States. The central figures, portrayed in their nudity, symbolize not only their exposure to societal judgment but also their shared strength in solidarity. In a time when patriarchy is attempting to assert itself more forcefully, these women stand together, demonstrating resilience against the evolving norms that seek to marginalize them. Their closeness signifies that isolation in vulnerability can be transformed into empowerment when women support one another.",
    price: "$1,500.00"
  },
        "Tell Me How...Image Two": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches",
    description: "This painting powerfully illustrates the unsettling dynamics that arise when marriage is reshaped from a partnership based on equality into one of obligation and subservience. The woman, depicted in a moment of vulnerability, embodies the burdens placed upon her by societal expectations, where pleasing her husband often takes precedence over her own desires and needs. Her expression conveys both weariness and a sense of duty, highlighting the internal struggle many women face as they navigate the complexities of modern relationships against a backdrop of retrogressive ideologies. This portrayal underscores the emotional toll of adhering to outdated norms, where a woman's worth is measured by her compliance and ability to maintain harmony in a patriarchal structure.",
    price: "$1,000.00"
  },
        "Tell Me How...Image Three": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches",
    description: "The dynamic between the two figures in this painting captures a deep sense of intimacy interwoven with uncertainty. Their close proximity suggests a connection laden with unspoken emotions, where tenderness meets vulnerability. The intensity of their gazes reflects both a yearning for understanding and the apprehension that often accompanies relationships.",
    price: "$1,000.00"
  },
          "Tell Me How...Image Four": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches",
    description: "The dynamic between the two figures in this painting captures a deep sense of intimacy interwoven with uncertainty. Their close proximity suggests a connection laden with unspoken emotions, where tenderness meets vulnerability. The intensity of their gazes reflects both a yearning for understanding and the apprehension that often accompanies relationships.",
    price: "$1,000.00"
  },
            "Tell me how...Image Five": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches",
    description: "As artists, we wield the unique power to capture the essence of our society, encapsulating its complexities and emotions in a visual language that transcends words. The duality between the two figures suggests a conversation not only with themselves but with the larger community—inviting viewers to reflect on their own identities and histories. The distinct styles of their attire symbolize the diversity of voices and stories that must be acknowledged and celebrated. In this moment of creation, we become vessels of memory, tasked with honoring both the challenges we face and the hopes we nurture for the future. Ultimately, this painting not only questions how we wish to be remembered but also seeks to inspire a collective consciousness rooted in empathy and understanding, urging us all to engage in the ongoing dialogue of our shared humanity.",
    price: "$1,500.00"
  },
            "Tell Me How...Image Six": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches ",
    description: "In creating this painting, I aimed to visualize both vulnerability and strength. The individuals in the artwork represent not just a singular experience but a universal struggle with identity and acceptance. Their mirrored images evoke the tension between how they see themselves and how they wish to be seen by the world. Through my brushstrokes, I sought to capture that poignant moment of introspection, highlighting the beauty and complexity of being true to oneself regardless of external judgments. This piece stands as a celebration of authenticity, a testament to the journey of self-discovery that so many navigate, and an invitation for viewers to reflect on their own perceptions of identity.",
    price: "$1,500.00"
  },
            "Tell Me How...Image Seven": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "18 x 24 inches ",
    description: "In creating this painting, I aimed to visualize both vulnerability and strength. The individuals in the artwork represent not just a singular experience but a universal struggle with identity and acceptance. Their mirrored images evoke the tension between how they see themselves and how they wish to be seen by the world. Through my brushstrokes, I sought to capture that poignant moment of introspection, highlighting the beauty and complexity of being true to oneself regardless of external judgments. This piece stands as a celebration of authenticity, a testament to the journey of self-discovery that so many navigate, and an invitation for viewers to reflect on their own perceptions of identity.",
    price: "$1,500.00"
  },
            "Tell Me How...Image Eight": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "22 x 24 inches",
    description: "This image serves as an intimate reflection of my journey through menopause, a transformative phase that shook my understanding of self and sexuality. In grappling with the physical and emotional changes, I often found myself questioning my desirability. This painting captures the essence of vulnerability intertwined with strength; it embodies the moments of doubt and the rediscovery of my femininity. Through the lens of art, I sought to convey not just my struggle, but also the beauty that emerged from it—a renewed connection to my body and its sensuality.",
    price: "$2,000.00"
  },
           "The Bath": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "36 x 36 inches",
    description: "In this work, motherhood is rendered not as an idealized state, but as a lived terrain of tenderness, fatigue, and quiet endurance. The figure seems suspended between presence and withdrawal, her body carrying the weight of labor while her gaze turns inward, toward a private refuge. Bathed in a softened palette of pale blues and muted warmth, the painting suggests those fragile moments in which a mother gathers solace wherever it can be found — in stillness, in solitude, in the act of simply pausing. Beneath its calm surface, however, lies an undercurrent of depletion: the emotional and physical exhaustion, the loneliness, and the depressive hush that can accompany care work so often left unseen. The result is a deeply human portrait of motherhood — one that honors both its grace and its grief.",
    price: "$3,700.00"
  },
            "Villains Aren't Born, Darling, They're Made": {
    collection: "Sensuality",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "36 x 36 inches",
    description: "This bold piece is an exploration of societal judgment and expectations. The woman is looking toward – or perhaps directly at – the viewer. The woman's contemplative expression is a quiet yet powerful protest with her piercing gaze and body language. The artwork is a challenge to reconsider preconceived notions of women, look deeper at the person, and avoid affixing simple labels on them. It is unjust to vilify such determined, confident women, as happens within certain societal narratives. We all wish to be judged on our own merit. Therefore, we should follow the Golden Rule even in our internal dialog.",
    price: "$3,700.00"
  },
            "Alli": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "Alli centers on a videographer—modeled after the artist's daughter-in-law, holding her camera with the steady focus of someone trained to look without flinching. She stands in for the public eye: present, recording, and refusing to look away as political events unfold around us. The portrait is intimate, yet it carries the weight of a collective moment. The camera becomes both tool and symbol, an instrument of witness, accountability, and, at times, distance. In an era when images travel faster than understanding, Alli asks what it means to document history while living inside it. The work points to the tension between participation and observation: we watch, we react, we record, and we move on, often before consequences fully surface. By anchoring a contemporary political question in a personal likeness, the painting suggests that history is not an abstract verdict delivered later; it is assembled now, frame by frame, through the photographs and videos we choose to make, share, believe, or ignore. What will those images say about us?",
    price: "$3,100.00"
  },
           "Eric": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "Eric is a compelling and emotive piece that skillfully merges realism with abstract elements. The interplay of light and shadow across Eric's face is particularly commendable, bringing a three-dimensionality to the portrait that heightens its lifelike presence. The large, round glasses serve as both a focal point and a narrative device, subtly suggesting introspection or a unique worldview that poignantly complements the personal context. By portraying both vulnerability and resilience, the artist offers viewers a complex emotional landscape to explore. Eric is a deeply personal tribute, and the artistic expression successfully conveys both the uniqueness of the subject and the universality of the emotions experienced when confronting loss.",
    price: "$3,100.00"
  },
             "Alli Two": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "20 x 20 inches",
    description: "The artwork Alli Two presents an engaging amalgamation of realism and abstract art. Through the deliberate interplay of these divergent styles, the artist effectively portrays the multi-faceted nature of the subject – a testament to their adeptness and innovative approach. The dark lines segmenting the subject's face, the blue and white 'scribbles', and the bold color palette, serve not only to frame the facial features but also add depth and complexity to the artwork. Using line to evoke such intricate fragmentation parallels beautifully with the artist's claim of presenting a 'fractured' and 'complex' character. The realistic rendering of the skin tones in contrast with the hints of red on the lips successfully direct the viewer's attention to the focal point - the face. Simultaneously, the woman's slightly parted lips and sideward gaze, inspire curiosity and elicit an empathetic response – a representation of the 'wise' description provided by the artist.",
    price: "SOLD (Available as print)"
  },
             "Hidden Wounds": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "36 x 36 inches",
    description: "Hidden Wounds delves into the complex interplay between vulnerability, masculinity, and intimacy. A nude male figure is turned away, causing the viewer to wonder what just happened apparently moments before. The figure's posture and the surrounding space evoke a deep sense of shame, inviting viewers to reflect on the tension under way. By addressing issues like body image and sexual development, particularly within the context of evangelical Christian values where basic education about such topics is scant, the piece raises questions about societal expectations in certain sects of America. It encourages contemplation of the hidden struggles that shape personal and collective identities that can take a lifetime from which to heal.",
    price: "SOLD (Available as print)"
  },
             "Jim": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "Jim presents a profound meditation on the theme of introspection, an exploration of the subject's contemplative nature that humanizes the abstract, granting it a tangible presence on canvas. The use of acrylic paint allows for vibrant hues and shapes, adding a lively dimension to the artwork, which maintains balance between figurative and abstract aesthetics. The combination of figurative and abstract art in Jim is its crowning feature, merging reality with the deeper, often unseen layers of human nature. It would be fascinating to see the artist delve deeper into this style, exploring the interplay between abstract and figurative art.",
    price: "$3,100.00"
  },
             "The Artist Self Reflection": {
    collection: "Melancholy",
    medium: "Acrylic on Linen Canvas • 2026",
    dimensions: "30 x 30 inches",
    description: "My art has always been private, my cherished personal escape. For years, my daughter encouraged me to put my art out there. I did exactly that after her death, initially to reach out to other grieving parents. I like to think she might say with a smile See?",
    price: "$3,100.00"
  },
};
