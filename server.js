import { ApolloServer, gql } from "apollo-server";

let tweets = [
	{
		id: "1",
		text: "first one",
	},
	{
		id: "2",
		text: "second one",
	},
];

let users = [
	{
		id: "1",
		firstName: "nuri",
		lastName: "nu",
	},
	{
		id: "2",
		firstName: "nuna",
		lastName: "nu",
	},
];

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		firstName: String!
		lastName: String!
		fullName: String!
	}
	type Tweet {
		id: ID!
		text: String!
		author: User
	}

	type Query {
		allUsers: [User!]!
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
		allUsers() {
			console.log("all users called");
			return users;
		},
	},
	Mutation: {
		postTweet(_, { text, userId }) {
			const newTweet = {
				id: tweets.length + 1,
				text,
			};
			tweets.push(newTweet);
			return newTweet;
		},
		deleteTweet(_, { id }) {
			const tweet = tweets.find(tweet => tweet.id === id);
			if (!tweet) return false;
			tweets = tweets.filter(tweet => tweet.id !== id);
			return true;
		},
	},
	User: {
		fullName({ firstName, lastName }) {
			return `${firstName} ${lastName}`;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*
    # How we can create resolver function in any fields
*/
