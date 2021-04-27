import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Link from 'next/link';

import Header from '../../components/Header';
import PreviewButton from '../../components/PreviewButton';
import ReactUtterances from '../../components/Comments';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string,
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  preview: boolean;
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function Post({ preview, post, prevPost, nextPost }: PostProps) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
      </>
    )
  }

  const totalWords = post.data.content.reduce((acc, content) => {
    const numberWordsEachContent = content.heading.split(/\s/g).length + RichText.asText(content.body).split(/\s/g).length;
    acc += numberWordsEachContent;
    return acc;
  }, 0);
  const readTime = Math.ceil(totalWords / 200);

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>

      <Header />
      <main>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt="banner" />
        </div>

        <div className={styles.contentRelatedPost}>
          <article className={styles.post}>
            <h1>{post.data.title}</h1>

            <div className={styles.containerPublication}>
              <div className={styles.contentPublication}>
                <div className={styles.contentPublication__datePublished}>
                  <FiCalendar />
                  <time>{format(new Date(post.first_publication_date), "dd MMM yyyy", { locale: ptBR })}</time>
                </div>
                <div className={styles.contentPublication__author}>
                  <FiUser />
                  <p>{post.data.author}</p>
                </div>
                <div className={styles.contentPublication__readTime}>
                  <FiClock />
                  <p>{readTime} min</p>
                </div>
              </div>
              {post.last_publication_date &&
                <div className={styles.contentPublication__update}>
                  * editado em {format(new Date(post.last_publication_date), "dd MMM yyyy", { locale: ptBR })},
                    às {format(new Date(post.last_publication_date), "HH':'mm", { locale: ptBR })}
                </div>
              }
            </div>

            <div className={styles.postContent}>
              {post.data.content.map((content) => {
                return (
                  <div key={content.heading} className={styles.singleContent}>
                    <h2>{content.heading}</h2>
                    <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body) }}></div>
                  </div>
                )
              })}
            </div>
          </article>

          <div className={styles.postsNavigation}>
            {prevPost &&
              <div className={styles.postsNavigationLeft}>
                <Link href={`/post/${prevPost.uid}`}>
                  <a >
                    <p>{prevPost.data.title}</p>
                    <p>Post anterior</p>
                  </a>
                </Link>
              </div>
            }
            {nextPost &&
              <div className={styles.postsNavigationRight}>
                <Link href={`/post/${nextPost.uid}`}>
                  <a >
                    <p>{nextPost.data.title}</p>
                    <p>Próximo post</p>
                  </a>
                </Link>
              </div>
            }
          </div>

          <ReactUtterances
            repo='die-goncalves/ignite-reactjs-modulo03-desafio02-spacetraveling-new-features'
            issueMap='issue-term'
            issueTerm='pathname'
            theme='dark-blue'
            label='Comments'
          />

          {preview &&
            <div className={styles.previewButton}>
              <PreviewButton />
            </div>
          }
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    pageSize: 1,
  })

  const postsUid = posts.results.map((post) => {
    return {
      uid: post.uid,
    }
  })
  const paths = postsUid.map((post) => {
    return (
      { params: { slug: post.uid } }
    )
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = null, previewData = {} }) => {
  const { slug } = params;
  const { ref } = previewData;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), ref ? { ref } : null);

  const nextPost = (await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    after: response.id,
    orderings: '[document.first_publication_date]'
  })).results[0] ?? null;
  const prevPost = (await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    after: response.id,
    orderings: '[document.first_publication_date desc]'
  })).results[0] ?? null;

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: (response.last_publication_date && (response.first_publication_date === response.last_publication_date ? null : response.last_publication_date)),
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content
    }
  }

  return {
    props: { preview, post, prevPost, nextPost }
  }
};
