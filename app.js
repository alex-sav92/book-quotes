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
            <blockquote>${q.quote}</blockquote>
            <p>${q.book} — ${q.author}</p>
        `;

        container.appendChild(div);
    });
}

loadQuotes();