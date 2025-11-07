const getActivitiesQuery = /* GraphQL */ `
  query getActivities {
    activities {
      nodes {
        id
        status
        title
        slug
        featuredImageId
        dateGmt
        contentTypeName
        modifiedGmt
        featuredImage {
          node {
            altText
            id
            fileSize
            dateGmt
            mediaItemUrl
            mediaType
            mimeType
            modifiedGmt
            slug
            sourceUrl
            mediaDetails {
              width
              height
              file
            }
          }
        }
        content
        activityDetails {
          address
          place
          startDatetime
          geo {
            latitude
            longitude
            streetAddress
          }
        }
        categories {
          nodes {
            name
            id
          }
        }
      }
    }
  }`;

export default getActivitiesQuery;
