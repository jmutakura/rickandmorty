import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.css';
import {
	Card,
	CardActionArea,
	Button,
	CardContent,
	CardMedia,
	CardActions,
	Typography,
	Container,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';

export async function getServerSideProps({ query }) {
	const { id } = query;
	const res = await fetch(`${defaultEndpoint}/${id}`);
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}

export default function Character({ data }) {
	const { name, image, gender, status, species, origin, location } = data;
	return (
		<div className={styles.container}>
			<Head>
				<title>{name} | Rick & Morty Wiki</title>
				<meta name='description' content='Rick & Morty Wiki' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>{name}</h1>
				<Container
					style={{
						display: 'flex',
						alignContent: 'center',
						justifyContent: 'center',
						marginTop: '1rem',
					}}
				>
					<Card sx={{ maxWidth: 500 }}>
						<CardMedia
							component='img'
							alt={name}
							width='500'
							height='400'
							image={image}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								{name}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								Gender: {gender}
								<br></br>
								Status: {status}
								<br></br>
								Species: {species}
								<br></br>
								Origin: {origin.name}
								<br></br>
								Location: {location.name}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size='small'>Episodes apeared</Button>
							{/* <Button size='small'>Learn More</Button> */}
						</CardActions>
					</Card>
				</Container>
				<p>
					<Link href='/'>
						<Button variant='outlined' startIcon={<ArrowBackIcon />}>
							Back to Home Page
						</Button>
					</Link>
				</p>
			</main>

			<footer className={styles.footer}>
				<a href='/' target='_blank' rel='noopener noreferrer'>
					{name} - Rick & Morty Wiki
				</a>
			</footer>
		</div>
	);
}
