import { ApolloServer, gql } from "apollo-server";
import { text } from "stream/consumers";

const typeDefs = gql`
	type User {
		id: ID
		username: String
	}
	type Tweet {
		id: ID!
		text: String!
		author: User!
	}

	type Query {
		allTweets: [Tweet!]!
		tweet(id: ID!): Tweet!
	}
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		deleteTweet(id: ID!): Boolean!
	}
`;

// GET /api/v1/tweets
// POST /api/v1/tweets
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

    type Mutation == POST request of REST api
        things are mutataed in the backend such as database
        the data user sends to the database and mutate the data
        POST, DELETE, PUT is all Mutation

    This is query by default
    and if you want to mutate this, you need to write mutation 
    {
        allTweets {
        text
        }
        tweet(id: "1") {
        author {
            username
        }
        text
        }
    }

    mutation{
        postTweet(text:"Hello,first tweet!", userId:"1") {
        text
        }
    }
*/
