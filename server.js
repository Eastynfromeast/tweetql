import { ApolloServer, gql } from "apollo-server";
import { text } from "stream/consumers";

const typeDefs = gql`
	type User {
		id: ID
		username: String
	}
	type Tweet {
		id: ID
		text: String
		author: User
	}

	type Query {
		allTweets: [Tweet]
		tweet(id: ID): Tweet
	}
`;

// GET /api/v1/tweets
// GET /api/v1/tweet/:id

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*

    Putting inside Query is like creating GET Request( GET /api/v1/tweet/:id) in REST api to be ask for a request by a user

    type Query {
		allTweets: [Tweet]
		tweet(id: ID): Tweet // receiving an argument
	}
*/
