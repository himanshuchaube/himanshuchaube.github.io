/* ==================================
   LOAD PUBLICATIONS
================================== */

fetch('json_data/publications.json')
    .then(response => response.json())
    .then(publications => {

        const publicationContainer =
            document.getElementById('publications-list');

        publicationContainer.innerHTML = '';

        publications.forEach((pub, index) => {

            const publicationHTML = `

                <div class="publication">

                    <p>

                        <strong>
                            ${index + 1}.
                        </strong>

                        ${pub.authors}
                        (${pub.year}).

                        <strong>
                            ${pub.title}
                        </strong>.

                        <i>
                            ${pub.journal || pub.publication || ''}
                        </i>

                    </p>

                    <p>
                        Citations:
                        ${pub.citations ?? 0}
                    </p>

                </div>

                <hr>

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

fetch('json_data/conferences.json')
    .then(response => response.json())
    .then(conferences => {

        const conferenceContainer =
            document.getElementById('conference-list');

        conferenceContainer.innerHTML = '';

        conferences.forEach((conf, index) => {

            const conferenceHTML = `

                <div class="publication">

                    <p>

                        <strong>
                            ${index + 1}.
                        </strong>

                        <strong>
                            ${conf.title}
                        </strong>

                    </p>

                    <p>

                        ${conf.conference},
                        ${conf.location}
                        (${conf.year})

                    </p>

                </div>

                <hr>

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
