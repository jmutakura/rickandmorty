import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}


const Home: NextPage <{ data: Event[] }> = ({ data }) => {
  console.log(data)
  const results:Array<String> = data.results;
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick & Morty Wiki</title>
        <meta name="description" content="Wiki for characters in Rick & Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rick & Morty Character Wiki
        </h1>

        <p className={styles.description}>
          Rick & Morty wiki for characters in the show!
        </p>

        <ul className={styles.grid}>
          {results.map((result) => {
            const { id, name, image } = result;
            console.log(id, name, image);
            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs" >
                  <h2>Documentation &rarr;</h2>
                  <p>Find in-depth information about Next.js features and API.</p>
                </a>
              </li>
               
            )
          })}

          

          
          
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
