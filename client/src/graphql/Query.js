import { gql } from '@apollo/client';

export const GET_TODOS = gql`
     {
         getTodos {
             id
             title
             details
             date
         }
    }
`;

