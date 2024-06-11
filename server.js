import { ApolloServer, gql } from "apollo-server";

let tweets = [
	{
		id: "1",
		text: "first one",
		userId: "2",
	},
	{
		id: "2",
		text: "second one",
		userId: "1",
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
		firstName: String!
		lastName: String!
		"""
		Is the sum of firstName+lastName
		"""
		fullName: String!
	}
	"""
	Tweet object represents a resource for a Tweet
	"""
	type Tweet {
		id: ID!
		text: String!
		author: User
	}

	type Query {
		"""
		Bring all users
		"""
		allUsers: [User!]!
		"""
		Brings all Tweets
		"""
		allTweets: [Tweet!]!
		"""
		Bring a Tweet and required a Tweet ID
		"""
		tweet(id: ID!): Tweet
	}
	type Mutation {
		"""
		Posts a Tweet which is requiring text and userId
		"""
		postTweet(text: String!, userId: ID!): Tweet!
		"""
		Deletes a Tweet if found, else returns false
		"""
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
				userId,
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
	Tweet: {
		author({ userId }) {
			return users.find(user => user.id === userId);
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*
	# Documentation
		How to write a documentation of schema in GraphQL?
			just write a text inside """ (3 double quotation marks) """ and locate the text above the field
*/
