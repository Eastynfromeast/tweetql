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
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*
    How to get query - the basic
        {
            allTweets{
                id
                text
            }
        }

    Mutation Resolver
        How to mutate - the basic
        Mutation: {
            postTweet(_, { text, userId }) {
                const newTweet = {
                    id: tweets.length + 1,
                    text,
                };
                tweets.push(newTweet);
                return newTweet;
            },
        },
        ex)
            mutation {
                postTweet(text:"I am NEW!", userId:"1"){
                    id
                    text
                }
            }

        Question?
            mutation 을 실험하기 위해 postTweet을 따라서 작성하고
            userId를 변경해서 postTweet을 작성했는데 기존 3번째 트윗이 사라지고 변경된 텍스트가 3번째 "업데이트" 됨
            why?!!!
            Answer is the database is only in-memory!
                현재 서버에서 저장되는 데이터베이스는 서버가 다시 실행되면 해당 코드 상단의 임의로 정의해준 const tweets 만 불러올 것
                ==> 우리가 실제 서버에 업데이트 하는 값이 아니기때문에 새로고침해서 날라갔다!
            {
                "data": {
                    "allTweets": [
                    //...
                    {
                        "id": "3", // userId를 "2"로 변경
                        "text": "I am the fourth"
                    },
                    {
                        "id": "4", // userId "1"
                        "text": "I am the fourth"
                    }
                    ]
                }
            }

    The division betweent query resolver and mutation resolver is conceptual, just to organize our code better
*/
