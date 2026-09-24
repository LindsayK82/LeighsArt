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