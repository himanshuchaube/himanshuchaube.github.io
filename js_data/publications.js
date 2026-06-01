/* ==================================
   LOAD PUBLICATIONS
================================== */

fetch('data/publications.json')

    .then(response => response.json())

    .then(publications => {

        const publicationContainer =
            document.getElementById('publications-list');

        publicationContainer.innerHTML = '';

        publications.forEach(pub => {

            const publicationHTML = `

                <div class="publication">

                    <div class="publication-title">

                        ${pub.title}

                    </div>

                    <p>

                        ${pub.authors}
                        (${pub.year}).

                        <i>${pub.journal}</i>

                        ${pub.volume}(${pub.issue}),

                        ${pub.pages}.

                    </p>

                    <div class="publication-doi">

                        DOI:
                        <a href="${pub.doi}"
                           target="_blank">

                           ${pub.doi}

                        </a>

                    </div>

                </div>

            `;

            publicationContainer.innerHTML +=
                publicationHTML;
        });
    })

    .catch(error => {

        console.error(
            'Error loading publications:',
            error
        );

    });

/* ==================================
   LOAD CONFERENCES
================================== */

fetch('data/conferences.json')

    .then(response => response.json())

    .then(conferences => {

        const conferenceContainer =
            document.getElementById('conference-list');

        conferenceContainer.innerHTML = '';

        conferences.forEach(conf => {

            const conferenceHTML = `

                <div class="publication">

                    <div class="publication-title">

                        ${conf.title}

                    </div>

                    <p>

                        ${conf.conference},

                        ${conf.location}

                        (${conf.year})

                    </p>

                </div>

            `;

            conferenceContainer.innerHTML +=
                conferenceHTML;
        });
    })

    .catch(error => {

        console.error(
            'Error loading conferences:',
            error
        );

    });
