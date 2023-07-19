import { IconWebhook } from '@ws-bom-sample-basic/icons';
import { IEquatable, IRouteLink, getClassNames } from '@websolutespa/bom-core';
import { useDrawer, useLayout } from '@websolutespa/bom-mixer-hooks';
import { IconChevronDown } from '@websolutespa/bom-mixer-icons';
import { Button, Container, Flex, MarketsAndLanguagesDrawer, Nav, NavLink, Text, UIComponentProps } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';
import styled, { css } from 'styled-components';

type ContainerProps = {
  fixed?: boolean;
  sticky?: boolean;
  scrolled?: boolean;
};

export type HeaderContainerProps = UIComponentProps<ContainerProps>;

const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  align-items: center;
  min-height: 120px;
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);

  ${props => props.fixed ? css`
    position: fixed;
    top: 0;
    left: 0;
    right: var(--locked-padding-right, 0);
    z-index: 1000;
    transition: background-color ease-in-out 350ms;
    background: ${props.scrolled ? 'var(--color-neutral-900)' : 'transparent'};
    // color: ${props.scrolled ? 'var(--color-neutral-100)' : 'var(--color-neutral-100)'};
  ` : ''};

  ${props => props.sticky ? css`
    position: sticky;
    min-height: 80px;
    top: 0;
    right: var(--locked-padding-right, 0);
    z-index: 1000;
    transition: background-color ease-in-out 350ms;
    background: ${props.scrolled ? 'var(--color-neutral-900)' : 'var(--color-neutral-100)'};
    color: ${props.scrolled ? 'var(--color-neutral-100)' : 'var(--color-neutral-900)'};
    border-bottom: 1px solid ${props.scrolled ? 'var(--color-neutral-900)' : 'var(--color-neutral-300)'};
  ` : ''};
`;

type Props = {
  fixed?: boolean;
  sticky?: boolean;
};

export type HeaderProps = UIComponentProps<Props>;

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const layout = useLayout();
  const [drawer, openDrawer, closeDrawer] = useDrawer();

  const [nav, setNav] = useState<IEquatable | null>(null);
  const onNav = (item?: IRouteLink) => {
    // console.log('onNav', item);
    const href = item?.href || null;
    setNav(href !== nav ? href : null);
  };

  const classNames = getClassNames('header', { fixed: props.fixed, sticky: props.sticky });
  return (
    <>
      <HeaderContainer className={classNames} {...props}>
        <Container.Fluid>
          <Flex.Row gap="1rem" gapMd="2rem" gapLg="3rem">
            <Flex flex="0 0 140px">
              <NavLink href={layout.topLevelHrefs.homepage || '/'} passHref>
                <Button as="a">
                  <IconWebhook width="3rem" height="3rem" />
                  <Text variant="heading30" padding="0 0.5rem">Mixer</Text>
                </Button>
              </NavLink>
            </Flex>
            <Flex className="print-none" flex="1" justifyContent="center">
              {layout.tree?.items && <Nav.Row gapSm="2rem" gapLg="3rem" display="none" displayMd="flex">
                {layout.tree.items.map((x, i) => (
                  <NavLink key={i} href={x.href} passHref>
                    <Button as="a" variant="nav" onClick={() => onNav()}>{x.title}</Button>
                  </NavLink>)
                )}
              </Nav.Row>}
            </Flex>
            <Flex flex="0 0 140px" justifyContent="flex-end">
              <Button gap="0.2rem" onClick={() => openDrawer('markets-and-languages')}>
                <Text>{layout.locale.toUpperCase()}</Text> <IconChevronDown />
              </Button>
            </Flex>
          </Flex.Row>
        </Container.Fluid>
        {props.children}
      </HeaderContainer>

      <MarketsAndLanguagesDrawer visible={drawer == 'markets-and-languages'} onClose={closeDrawer} />
    </>
  );
};
