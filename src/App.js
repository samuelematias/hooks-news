import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';

export default function App() {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('react hooks');
	const searchInputRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		getResults();
	}, []);

	const getResults = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://hn.algolia.com/api/v1/search?query=${query}`
			);
			setResults(response.data.hits);
		} catch (err) {
			setError(err);
		}

		setLoading(false);
	};

	const handleSearch = event => {
		event.preventDefault();
		getResults();
	};

	const handleClearSearch = () => {
		setQuery('');
		searchInputRef.current.focus();
	};

	return (
		<div
			className="container max-w-md
      mx-auto p-4 m-2
    bg-purple-300
    shadow-lg rounded"
		>
			<img
				src="https://icon.now.sh/react/c0c"
				alt="React Logo"
				className="float-right h-12"
			/>
			<h1
				className="text-grey-darkest
    font-thin"
			>
				{'Hooks News'}
			</h1>
			<form onSubmit={handleSearch} className="mb-2">
				<input
					type={'text'}
					onChange={event => setQuery(event.target.value)}
					value={query}
					ref={searchInputRef}
					className="border p-1
          rounded"
				/>
				<button type={'submit'} className="bg-orange-300 rounded m-1 p-1">
					{'Search'}
				</button>
				<button
					type={'button'}
					onClick={handleClearSearch}
					className="bg-teal-300 text-white p-1 rounded"
				>
					{'Clear'}
				</button>
			</form>
			{loading ? (
				<div className="font-bold text-orange-500">{'Loading results ...'}</div>
			) : (
				<ul className="list-reset leading-normal">
					{results.map(results => (
						<li key={results.objectID}>
							<a href={results.url} className="text-indigo-500">
								{results.title}
							</a>
						</li>
					))}
					{error && (
						<div className="text-red-500 font-bold">{error.message}</div>
					)}
				</ul>
			)}
		</div>
	);
}
