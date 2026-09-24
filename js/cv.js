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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cv-content");

  if (!container || typeof cvMarkdown === "undefined") {
    return;
  }

  function escapeHTML(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatInline(text) {
    let html = escapeHTML(text);

    // Convert Markdown links.
    html = html.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Bold and italic text.
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

    return html;
  }

  const lines = cvMarkdown.split(/\r?\n/);
  const fragment = document.createDocumentFragment();

  let currentSection = null;
  let currentList = null;

  function closeList() {
    currentList = null;
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      return;
    }

    // The page already has its CV heading.
    if (line.startsWith("## ")) {
      return;
    }

    // Section headings.
    if (line.startsWith("### ")) {
      closeList();

      currentSection = document.createElement("section");
      currentSection.className = "cv-section";

      const heading = document.createElement("h2");
      heading.textContent = line.slice(4);

      currentSection.appendChild(heading);
      fragment.appendChild(currentSection);
      return;
    }

    if (!currentSection) {
      currentSection = document.createElement("section");
      currentSection.className = "cv-section";
      fragment.appendChild(currentSection);
    }

    // Bullet-point entries.
    if (/^[•*-]\s+/.test(line)) {
      if (!currentList) {
        currentList = document.createElement("ul");
        currentList.className = "cv-list";
        currentSection.appendChild(currentList);
      }

      const item = document.createElement("li");
      item.innerHTML = formatInline(
        line.replace(/^[•*-]\s+/, "")
      );

      currentList.appendChild(item);
      return;
    }

    closeList();

    // Regular entries, including education and residencies.
    const paragraph = document.createElement("p");
    paragraph.className = "cv-entry";
    paragraph.innerHTML = formatInline(line);

    currentSection.appendChild(paragraph);
  });

  container.replaceChildren(fragment);
});