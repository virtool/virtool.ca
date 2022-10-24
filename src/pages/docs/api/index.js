import React from "react";
import { graphql } from "gatsby";
import { Api } from "../../../components/Api";

const APIDocs = ({ data, location }) => <Api data={data} location={location} />;

export const query = graphql`
  {
    allApiData {
      edges {
        node {
          id
          APIData
        }
      }
    }
  }
`;

export default APIDocs;
