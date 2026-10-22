/* ==================================
   LOAD PUBLICATIONS
   Format:
   Authors (Year). Title. Journal, Vol(Issue), Pages. DOI
================================== */

fetch('json_data/publications.json')
    .then(response => response.json())
    .then(publications => {

        const publicationContainer =
            document.getElementById('publications-list');

        publicationContainer.innerHTML = '';

        publications.forEach((pub, index) => {

            // Make author name bold
            const authors = (pub.authors || '')
                .replace(/Himanshu Chaube/g,
                         '<strong>Himanshu Chaube</strong>');

            // Journal, Vol(Issue), Pages
            const journalName =
                pub.journal || pub.publication || '';

            let journalInfo = journalName
                ? `<i>${journalName}</i>`
                : '';

            if (pub.volume) {
                journalInfo += `, ${pub.volume}`;
                if (pub.issue) {
                    journalInfo += `(${pub.issue})`;
                }
            }

            if (pub.pages) {
                journalInfo += `, ${pub.pages}`;
            }

            // DOI link
            const doiHTML = pub.doi
                ? `<br>
                   <span class="pub-doi">
                       DOI:
                       <a href="${pub.doi}"
                          target="_blank"
                          rel="noopener noreferrer">
                          ${pub.doi}
                       </a>
                   </span>`
                : '';

            // Citations (only if available)
            const citationHTML =
                (typeof pub.citations === 'number' && pub.citations > 0)
                    ? `<br>
                       <span class="pub-citations">
                           Citations: ${pub.citations}
                       </span>`
                    : '';

            const publicationHTML = `

                <div class="publication">

                    <p>

                        <strong>${index + 1}.</strong>

                        ${authors}
                        (${pub.year}).

                        ${pub.title}.

                        ${journalInfo}.

                        ${doiHTML}

                        ${citationHTML}

                    </p>

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
   (json_data/conferences.json)
   Fields: year, date, authors, title,
           event, venue, type
   Old fields (conference, location)
   are still supported as fallback.
================================== */

fetch('json_data/conferences.json')
    .then(response => response.json())
    .then(conferences => {

        const conferenceContainer =
            document.getElementById('conference-list');

        conferenceContainer.innerHTML = '';

        conferences.forEach((conf, index) => {

            // Make author name bold
            const authors = (conf.authors || '')
                .replace(/Chaube, H\./g,
                         '<strong>Chaube, H.</strong>');

            const event = conf.event || conf.conference || '';
            const venue = conf.venue || conf.location || '';

            const place = [venue, conf.date]
                .filter(Boolean)
                .join(', ');

            const conferenceHTML = `

                <div class="publication">

                    <p>

                        <strong>
                            ${index + 1}.
                        </strong>

                        ${authors}
                        (${conf.year}).

                        <strong>
                            ${conf.title}
                        </strong>.

                        <i>
                            ${event}
                        </i>${place ? ', ' + place : ''}.

                        ${conf.type ? '[' + conf.type + ']' : ''}

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

/* ==================================
   LOAD SCHOLAR STATS
================================== */

fetch('json_data/scholar_stats.json')
    .then(response => response.json())
    .then(stats => {

        document.getElementById(
            'scholar-stats'
        ).innerHTML = `

            <p>
                Citations :
                ${stats.citations}
            </p>

            <p>
                h-index :
                ${stats.h_index}
            </p>

            <p>
                i10-index :
                ${stats.i10_index}
            </p>

        `;

    })

    .catch(error => {

        console.error(
            'Error loading scholar stats:',
            error
        );

    });

/* ==================================
   LOAD COLLABORATORS
================================== */

fetch('json_data/coauthors.json')
    .then(response => response.json())
    .then(authors => {

        const container =
            document.getElementById(
                'coauthors-list'
            );

        container.innerHTML = '';

        authors.forEach(author => {

            container.innerHTML += `

                <p>
                    ${author}
                </p>

            `;

        });

    })

    .catch(error => {

        console.error(
            'Error loading collaborators:',
            error
        );

    });
