/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import { useJsonForm, JsonForm } from "@forestryio/gatsby-xeditor-json"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dataJson(fields: { fileRelativePath: { eq: "/data/author.json" } }) {
        firstName
        lastName
        location
        social {
          twitter
        }
        fields {
          fileRelativePath
        }
      }
    }
  `)

  const [author] = useJsonForm(data.dataJson, {
    fields: [
      { name: "firstName", component: "text" },
      { name: "lastName", component: "text" },
      { name: "location", component: "text" },
      { name: "social.twitter", component: "text" },
    ],
  })
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <JsonForm
        data={data.dataJson}
        render={a => {
          console.log(a)
          return null
        }}
      />
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "600" }}>Author</span>
        <a
          href={`https://twitter.com/${author.twitter}`}
          style={{
            color: "inherit",
          }}
        >
          {author.firstName} {author.lastName}
        </a>
      </div>
    </div>
  )
}

export default Bio
