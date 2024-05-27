import { ApolloServer, gql } from "apollo-server";

const tweets = [
	{
		id: "1",
		text: "first one",
	},
	{
		id: "2",
		text: "second one",
	},
];

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		firstName: String!
		lastName: String!
	}
	type Tweet {
		id: ID!
		text: String!
		author: User
	}

	type Query {
		allTweets: [Tweet!]!
		tweet(id: ID!): Tweet
	}
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		deleteTweet(id: ID!): Boolean!
	}
`;

// GET /api/v1/tweets
// POST /api/v1/tweets
// GET /api/v1/tweet/:id

const resolvers = {
	Query: {
		allTweets() {
			return tweets;
		},
		tweet(root, { id }) {
			return tweets.find(tweet => tweet.id === id);
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*
    GraphQL schema definition language
        any GraphQL server will understand it
        BUT depending on what programming language you are using the next step will be diffrent
        The logic will be the same which is called "Resolvers"

    type Query has a field called "allTweets",
    and we are going to write resolvers for the allTweets field

    When Apollo server call your resolver function, Apollo server gives root argument and arguments the function needs to your function!

    When user sends arguments, those arguments always be SECOND arguments, ALWAYS
    Root argument will be ALWAYS FIRST
*/
