import "./App.css";

import { ApolloProvider } from "@apollo/client";

import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { removeDirectivesFromDocument } from "@apollo/client/utilities";
import React from "react";

const EXCHANGE_RATES = gql`
	query GetLaunches {
		launches(limit: 5) {
			launch_date_utc
			launch_success
			rocket {
				rocket_name
			}
			links {
				video_link
			}
			details
		}
	}
`;

const client = new ApolloClient({
	uri: "https://api.spacex.land/graphql/",
	cache: new InMemoryCache(),
});

function GetLaunches() {
	const { loading, error, data } = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;

	let textColor = "";
	let success = "";

	return (
		<div>
			{data.launches.map((value, key) => {
				if (value.launch_success) {
					textColor = "green";
					success = "Launch successful";
				} else {
					textColor = "red";
					success = "Launch failed";
				}
				return (
					<div
						style={{
							color: textColor,
							borderWidth: "2",
							borderColor: textColor,
							borderStyle: "solid",
							margin: "20px",
							padding: "10px",
							borderRadius: "10px",
						}}
						key={value}
					>
						<h3>
							{value.rocket.rocket_name} at {value.launch_date_utc}
							{value.launch_success}
						</h3>
						<h4>{success}</h4>
						<p>
							Preview on{" "}
							<a href={value.links.video_link}>
								Youtube : {value.links.video_link}
							</a>
						</p>
						<p>{value.details}</p>
					</div>
				);
			})}
		</div>
	);
}

function App() {
	return (
		<ApolloProvider client={client}>
			<h2>My first Apollo app 🚀</h2>
			<GetLaunches />
		</ApolloProvider>
	);
}

export default App;
