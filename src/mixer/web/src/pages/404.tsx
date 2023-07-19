import { Footer, Header } from '@ws-bom-sample-basic/ui';
import { IStaticContext, PageProps, asServerProps } from '@websolutespa/bom-core';
import { getErrorPageLayout } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Layout, Meta, Page, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function Error404({ layout, page, params }: PageProps) {
  // console.log('Error404.params', page, params);
  return (
    <Layout>
      <Meta />
      <Page>
        <Header sticky />

        <Section minHeight="calc(100vh - 135px)">
          <Container>
            <Flex.Col minHeight="60vh" justifyContent="center" alignItems="center">
              <Flex.Row alignItems="flex-start">
                <Box padding="0 1rem" borderRight="1px solid var(--color-neutral-300)">
                  <Text variant="display40" fontWeight="700" marginBottom="0.5rem" color="var(--color-primary-500)">404</Text>
                </Box>
                <Box padding="0 1rem">
                  <Text variant="display40" fontWeight="700" marginBottom="0.5rem">{page.title}</Text>
                  <Text color="var(--color-neutral-500)" marginBottom="2rem">{page.abstract}</Text>
                </Box>
              </Flex.Row>
            </Flex.Col>
          </Container>
        </Section>

        <Footer />
      </Page>
    </Layout>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const { layout, page } = await getErrorPageLayout();
  // console.log('404.getStaticProps', { layout, page });
  const props = asServerProps({ ...context, layout, page });
  return {
    props,
  };
}
