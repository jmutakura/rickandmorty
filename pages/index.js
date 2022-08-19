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
	Link,
} from '@mui/material';
import { useState, useEffect } from 'react';

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

				<div className={styles.grid}>
					{results.map((result) => (
						<Card
							key={result.id}
							sx={{ maxWidth: 345 }}
							className={styles.card}
						>
							<CardActionArea href=''>
								<CardMedia
									component='img'
									height='250'
									image={result.image}
									alt={`${result.name} image`}
								/>
								<CardContent>
									<Typography variant='body2' color='text.secondary'>
										<b>Name: {result.name}</b>
									</Typography>
								</CardContent>
							</CardActionArea>
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
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
