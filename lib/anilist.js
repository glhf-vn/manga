async function fetchAPI(query, variables) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getCover(anilistID) {
    const data = await fetchAPI(
        `
        query ($id: Int) {
            Media (id: $id, type: MANGA) {
                coverImage {
                    large
                }
            }
        }
        `,
        {
            id: anilistID
        }
    )

    console.log(anilistID, data)

    return data.Media.coverImage.large
}