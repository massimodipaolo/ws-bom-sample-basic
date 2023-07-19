import { IHomepage } from '@ws-bom-sample-basic/models';
import { Footer, Header, LAZY_MODULES } from '@ws-bom-sample-basic/ui';
import { IStaticContext, PageProps, asEquatable, asServerProps } from '@websolutespa/bom-core';
import { IconGithub, IconWebhook } from '@websolutespa/bom-mixer-icons';
import { getLayout, getPage, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Layout, LazyLoader, Meta, Page, Section, Text } from '@websolutespa/bom-mixer-ui';
import Link from 'next/link';
import styled from 'styled-components';

const StyledPre = styled.pre`
  max-height: 18rem;
  overflow-y: auto;
  padding: 1em;
  margin-top: 1em;
  white-space: pre-wrap;
  border: 1px solid rgba(0,0,0,0.3);
  color: var(--color-neutral-500);
`;

export default function Homepage({ layout, page, params }: PageProps<IHomepage>) {
  return (
    <Layout>
      <Meta />
      <Page className="negative" minHeight="100vh">
        <Header sticky />

        <Section padding="3rem 0" textAlign="center">
          <Container maxWidthMd="80ch">
            {page.abstract &&
              <Text variant="display30" as="span" fontWeight="700" lineHeight="1.15" gradient dangerouslySetInnerHTML={{ __html: page.abstract }} />
            }
            <Flex.Row paddingTop="2rem" gap="1rem" justifyContent="center">
              <Link href="https://bom-storybook.vercel.app/" passHref>
                <Button as="a" variant="primary" target="_blank"><span>Storybook</span> <IconWebhook /></Button>
              </Link>
              <Link href="https://github.com/websolutespa/bom/tree/main/sample/basic/src/mixer/web" passHref>
                <Button as="a" variant="primary" target="_blank"><span>Github</span> <IconGithub /></Button>
              </Link>
            </Flex.Row>
          </Container>
        </Section>

        <LazyLoader components={page.components} modules={LAZY_MODULES} />

        <Section padding="0 0 2rem 0">
          <Container maxWidthMd="80ch">
            <Box padding="2rem" border="2px solid var(--color-neutral-800)" borderRadius="var(--border-radius)">
              <Text variant="heading40" borderBottom="2px solid var(--color-neutral-800)">Page</Text>
              <StyledPre>{JSON.stringify(page, null, 2)}</StyledPre>
            </Box>
          </Container>
        </Section>

        <Section padding="0 0 2rem 0">
          <Container maxWidthMd="80ch">
            <Box padding="2rem" border="2px solid var(--color-neutral-800)" borderRadius="var(--border-radius)">
              <Text variant="heading40" borderBottom="2px solid var(--color-neutral-800)">Layout</Text>
              <StyledPre>{JSON.stringify(layout, null, 2)}</StyledPre>
            </Box>
          </Container>
        </Section>

        <Footer />
      </Page>
    </Layout>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IHomepage>('homepage', id, market, locale);

  const props = asServerProps({ ...context, layout, page });
  return {
    props,
    /*
    * Next.js will attempt to re-generate the page when a request comes in at most once every 60 seconds
    */
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('homepage');
  return {
    paths,
    /*
    * getStaticProps runs in the background when using fallback: true
    * getStaticProps is called before initial render when using fallback: blocking
    */
    fallback: 'blocking',
  };
}
