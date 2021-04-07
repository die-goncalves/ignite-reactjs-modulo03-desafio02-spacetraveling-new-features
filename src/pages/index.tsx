import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../components/Header';
import PreviewButton from '../components/PreviewButton';

import { FiCalendar, FiUser } from 'react-icons/fi';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  preview: boolean;
  postsPagination: PostPagination;
}

export default function Home({ preview, postsPagination }: HomeProps) {
  const [joinPosts, setJoinPosts] = useState<PostPagination>(postsPagination);
  function handleNextPage(){
    fetch(joinPosts.next_page)
          .then(response => response.json())
          .then(data => setJoinPosts({
            next_page: data.next_page,
            results: [...joinPosts.results, ...data.results.map((post) => {
              return {
                uid: post.uid,
                first_publication_date: post.first_publication_date,
                data: {
                  title: post.data.title,
                  subtitle: post.data.subtitle,
                  author: post.data.author,
                }
              }
            })]
          }));
  }

  return (
    <>
      <Header />
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <section>
            {joinPosts.results.map((post) => (
              <article key={post.uid}>
                <header>
                  <Link href={`/post/${post.uid}`}>
                    <a>
                      {post.data.title}
                    </a>
                  </Link>
                </header>
              
                <p>{post.data.subtitle}</p>

                <footer>
                  <div className={styles.container}>
                    <div className={styles.contentPublication}>
                      <div className={styles.contentPublication__datePublished}>
                        <FiCalendar />
                        <time>{format(new Date(post.first_publication_date), "dd MMM yyyy", { locale: ptBR })}</time>
                      </div>
                      <div className={styles.contentPublication__author}>
                        <FiUser />
                        <p>{post.data.author}</p>
                      </div>
                    </div>
                  </div>
                </footer>
            </article>
            ))}
          </section>

          {joinPosts.next_page && <button onClick={handleNextPage}>Carregar mais posts</button>}

          {preview &&
            <div className={styles.previewButton}>
              <PreviewButton />
            </div>
          }
        </div>      
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = null, previewData = {} }) => {
  const { ref } = previewData;

  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
      ref: ref ? ref : null
  })
  
  const posts = postsResponse.results.map((post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })
  
  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }
  
  return {
      props: { preview, postsPagination }
  };
};
