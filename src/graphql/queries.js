// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTalk = `query GetTalk($id: ID!) {
  getTalk(id: $id) {
    id
    name
    description
    speakerName
  }
}
`;
export const listTalks = `query ListTalks(
  $filter: ModelTalkFilterInput
  $limit: Int
  $nextToken: String
) {
  listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      speakerName
    }
    nextToken
  }
}
`;
