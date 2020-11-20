import React from "react"
import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { HackathonDefinition } from "../components/HackathonDefinition"
import { HackathonTitle } from "../components/HackathonTitle"
import { graphql } from "gatsby"
import { EventSponsors } from "../components/EventSponsors"

const HomePage = ({ data }) => {
  const { allMarkdownRemark } = data
  const { fields, frontmatter } = allMarkdownRemark.nodes[0]

  const {
    name,
    show_ticket_button,
    show_sponsors_list,
    sponsors,
    show_sponsor_button,
    sponsor_document,
    show_livestream,
    livestream_youtube,
    full_description,
    start,
  } = frontmatter
  const { slug } = fields

  return (
    <Layout>
      <SEO title="Home" />
      {/* Insert elements here! */}
      <HackathonTitle
        show_ticket_button={show_ticket_button}
        show_sponsor_button={show_sponsor_button}
        show_livestream={show_livestream}
        sponsor_document={sponsor_document}
        livestream_youtube={livestream_youtube}
        full_description={full_description}
        name={name}
        slug={slug}
        start={start}
      />
      <HackathonDefinition />
      {show_sponsors_list && <EventSponsors sponsors={sponsors} />}
    </Layout>
  )
}
export default HomePage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fields: { template: { eq: "events" } }
        frontmatter: { is_public: { eq: true } }
      }
      sort: { fields: frontmatter___start, order: DESC }
      limit: 1
    ) {
      nodes {
        frontmatter {
          name
          start
          full_description
          show_ticket_button
          show_sponsors_list
          show_sponsor_button
          show_livestream
          livestream_youtube
          sponsor_document {
            publicURL
          }
          sponsors {
            colour
            name
            tier
            tier_sponsors {
              colour
              image {
                publicURL
              }
              link
              name
              shadow_colour
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
