import React from "react";
import { graphql } from "gatsby";
import { API } from "../../../components/APIComponents";

const APIDocs = ({ data, location }) => <API data={data} location={location} />;

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
