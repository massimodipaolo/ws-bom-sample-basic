import { IconWebsolute } from '@ws-bom-sample-basic/icons';
import { Button, Container, Flex, Text, UIComponentProps } from '@websolutespa/bom-mixer-ui';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
};

export type FooterProps = UIComponentProps<Props>;

const FooterContainer = styled.div<FooterProps>`
  padding: 1rem 0;
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);
`;

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  function getYear() {
    return new Date().getFullYear();
  }
  return (
    <>
      <FooterContainer {...props}>
        <Container.Fluid>
          <Flex.Row justifyContent="space-between">
            <Text variant="paragraph30" color="var(--color-neutral-500)">©{getYear()} websolute spa</Text>
            <Link href="https://www.websolute.com" passHref>
              <Button as="a" target="_blank"><IconWebsolute /></Button>
            </Link>
          </Flex.Row>
        </Container.Fluid>
      </FooterContainer>
    </>
  );
};
