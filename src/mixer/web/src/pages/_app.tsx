import { GlobalStyle, theme, uiVariants } from '@ws-bom-sample-basic/ui';
import { ILayout, IPage, IRouteParams, isDevelopment } from '@websolutespa/bom-core';
import { LabelProvider, LayoutProvider, PageProvider } from '@websolutespa/bom-mixer-hooks';
import { Breakpoint, VariantsProvider } from '@websolutespa/bom-mixer-ui';
import { ThemeProvider } from 'styled-components';

export default function Application({ Component, pageProps }: ApplicationProps) {
  // const Application: NextPage<AppProps<{ [key: string]: any }>> = ({ Component, pageProps }) => {

  const { layout, page } = pageProps;

  if (!layout || !page) {
    return;
  }

  return (
    <LayoutProvider layout={layout}>
      <LabelProvider>
        <PageProvider page={page}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <VariantsProvider variants={uiVariants}>
              <Component {...pageProps} />
            </VariantsProvider>
            {isDevelopment && <Breakpoint />}
          </ThemeProvider>
        </PageProvider>
      </LabelProvider>
    </LayoutProvider>
  );
}

export type ApplicationProps = {
  Component: any;
  pageProps: {
    layout: ILayout,
    page: IPage,
    params: IRouteParams,
    [key: string]: any
  };
};
