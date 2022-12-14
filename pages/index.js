import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button,
	TextField,
	IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';

export async function getServerSideProps() {
	const res = await fetch(defaultEndpoint);
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}

export default function Home({ data }) {
	const { info, results: defaultResults = [] } = data;
	const [results, updateResults] = useState(defaultResults);
	const [page, updatePage] = useState({
		...info,
		current: defaultEndpoint,
	});
	const { current } = page;

	useEffect(() => {
		if (current === defaultEndpoint) return;

		async function request() {
			const res = await fetch(current);
			const nextData = await res.json();

			updatePage({
				current,
				...nextData.info,
			});

			if (!nextData.info?.prev) {
				updateResults(nextData.results);
				return;
			}

			updateResults((prev) => {
				return [...prev, ...nextData.results];
			});
		}
		request();
	}, [current]);

	function handleLoadMore() {
		updatePage((prev) => {
			return {
				...prev,
				current: page?.next,
			};
		});
	}

	function handleOnSubmitSearch(e) {
		e.preventDefault();
		const { currentTarget = {} } = e;
		const fields = Array.from(currentTarget?.elements);
		const fieldQuery = fields.find((field) => field.name === 'query');

		const value = fieldQuery.value || '';
		const endpoint = `${defaultEndpoint}?name=${value}`;

		updatePage({
			current: `${defaultEndpoint}?name=${value}`,
		});
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Rick & Morty Wiki</title>
				<meta name='description' content='Rick & Morty Wiki' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Rick & Morty Character Wiki</h1>

				<p className={styles.description}>
					Character wiki for the Rick and Morty series.
				</p>

				<form style={{ display: 'flex' }} onSubmit={handleOnSubmitSearch}>
					<TextField
						name='query'
						type='search'
						id='search-bar'
						className='text'
						label='Search for character'
						variant='outlined'
						placeholder='Search for character.'
						size='medium'
					/>
					<IconButton type='submit' size='medium' aria-label='search'>
						<SearchIcon size='medium' style={{ fill: 'blue' }} />
					</IconButton>
				</form>

				<div className={styles.grid}>
					{results.map((result) => (
						<Card
							key={result.id}
							sx={{ maxWidth: 345 }}
							className={styles.card}
						>
							<Link href={`/character/${result.id}`}>
								<CardActionArea href=''>
									<CardMedia
										component='img'
										height='250'
										image={result.image}
										alt={`${result.name} image`}
									/>
									<CardContent>
										<Typography variant='body2' color='text.secondary'>
											<b>{result.name}</b>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Link>
						</Card>
					))}
				</div>
				<Button onClick={handleLoadMore} variant='outlined'>
					Load More
				</Button>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Rick & Morty Wiki
				</a>
			</footer>
		</div>
	);
}
