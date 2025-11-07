const getProjectsEnergy = /* GraphQL */ `
  query getProjectsEnergy {
    projectsEnergy {
      nodes {
        content
        dateGmt
        featuredImageId
        id
        modifiedGmt
        title
        slug
        status
        projectEnergyDetails {
          order
          geo {
            latitude
            longitude
            streetAddress
          }
        }
        featuredImage {
          node {
            altText
            dateGmt
            id
            mediaType
            mimeType
            modifiedGmt
            slug
            sourceUrl
            fileSize
            mediaDetails {
              height
              width
              file
            }
          }
        }
      }
    }
  }`;

export default getProjectsEnergy;
