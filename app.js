async function loadQuotes() {

    const response = await fetch("./data/quotes.json");
    const quotes = await response.json();

    quotes.sort(
        (a,b) =>
            new Date(b.dateAdded) -
            new Date(a.dateAdded)
    );

    const container =
        document.getElementById("quotes");

    container.innerHTML = "";

    quotes.forEach(q => {

        const div =
        document.createElement("div");

        div.className = "quote";

        div.innerHTML = `
            <blockquote>
                “${q.quote}”
            </blockquote>

            <div class="meta">
                <strong>${q.book}</strong>
                — ${q.author}
            </div>

            <div class="tags">
                ${(q.tags || []).map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join("")}
            </div>
        `;

        container.appendChild(div);
    });
}

loadQuotes();