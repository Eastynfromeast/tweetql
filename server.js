import { ApolloServer, gql } from "apollo-server";
import { text } from "stream/consumers";

const typeDefs = gql`
	type Query {
		text: String
		hello: String
	}
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});

/*
    GraphQL api is a collection ot lots of types
        We have to explain the types of the data in the server to GraphQL server BEFORE EVEN THE SERVER STARTS
        A GraphQL schema provides a root type for each kind of operation
        GraphQL = "Graph Query Language"
        Schema Definition Language
            There is one language to query data and the same language is using to explain the GraphQL the shape of the data

        Query root type must be provided.
            Whatever you put in the query type, those things are what the users will be able to request
        
            SUPER IMPORTANT to create Query type!!!


        ex) SWAPI 
            schema {
            query: Root
            }
            
            type Root {
                allFilms(after: String, first: Int, before: String, last: Int): FilmsConnection
                film(id: ID, filmID: ID): Film
                allPeople(after: String, first: Int, before: String, last: Int): PeopleConnection
                person(id: ID, personID: ID): Person
                allPlanets(after: String, first: Int, before: String, last: Int): PlanetsConnection
                planet(id: ID, planetID: ID): Planet
                allSpecies(after: String, first: Int, before: String, last: Int): SpeciesConnection
                species(id: ID, speciesID: ID): Species
                allStarships(after: String, first: Int, before: String, last: Int): StarshipsConnection
                starship(id: ID, starshipID: ID): Starship
                allVehicles(after: String, first: Int, before: String, last: Int): VehiclesConnection
                vehicle(id: ID, vehicleID: ID): Vehicle

                """Fetches an object given its ID"""
                node(
                    """The ID of an object"""
                    id: ID!
                ): Node
                }
                
*/
