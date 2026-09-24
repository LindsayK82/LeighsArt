 function activateFromHash() {
    const name = window.location.hash.slice(1) || "about";
    activateTab(name);
  }

  window.addEventListener("hashchange", activateFromHash);
  activateFromHash();

const leighCV = {
  name: "Leigh Witherell",

  born: "1969 in Denver City, Texas, USA",

  location: "Philadelphia, Pennsylvania, USA",

  sections: [
    {
      title: "Education",
      entries: [
        {
          year: "2005",
          description: "Master of Arts, Wright State University, Dayton, Ohio",
          url: "https://wsu.edu/"
        },
        {
          year: "2002",
          description: "Bachelor of Arts, Wilmington College, Wilmington, Ohio",
          url: "https://www.wilmington.edu/"
        }
      ]
    },

    {
      title: "Residencies",
      entries: [
        {
          year: "2023",
          description: "Buinho Creative Hub, Messejana, Portugal",
          url: "https://buinho.pt/"
        }
      ]
    },

    {
      title: "Awards & Recognition",
      entries: [
        {
          year: "2026",
          description: "The Woman Artist Award - 6th Edition, Arts to Hearts Project, April 2026",
          url: "https://artstoheartsproject.com/"
        },
        {
          year: "2025",
          description: "3rd Place - All About Women 2025, Marin Society of Artists, Sept-Nov 2025",
          url: "https://www.marinsocietyofartists.org/"
        },
        {
          year: "2025",
          description: "Woman Art Award 2025, MUSA, May 2025",
          url: "https://www.musaartspace.it/womans-essence-londonmay-8-10th-2025/"
        }
      ]
    }

    // Additional sections and entries go here.
  ]
};

/*CV rendering logic*/
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cv-content");

  if (!container || typeof leighCV === "undefined") {
    return;
  }

  const identity = document.createElement("div");
  identity.className = "cv-identity";

  const name = document.createElement("h2");
  name.textContent = leighCV.name;

  const born = document.createElement("p");
  born.textContent = `Born ${leighCV.born}`;

  const location = document.createElement("p");
  location.textContent =
    `Lives and works in ${leighCV.location}`;

  identity.append(name, born, location);
  container.replaceChildren(identity);

  leighCV.sections.forEach(section => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "cv-section";

    const heading = document.createElement("h2");
    heading.textContent = section.title;
    sectionElement.appendChild(heading);

    section.entries.forEach(entry => {
      const row = document.createElement("div");
      row.className = "cv-entry";

      const year = document.createElement("span");
      year.className = "cv-year";
      year.textContent = entry.year || "";

      const description = document.createElement("p");

      if (entry.url) {
        const link = document.createElement("a");
        link.href = entry.url;
        link.textContent = entry.description;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        description.appendChild(link);
      } else {
        description.textContent = entry.description;
      }

      row.append(year, description);
      sectionElement.appendChild(row);
    });

    container.appendChild(sectionElement);
  });
});