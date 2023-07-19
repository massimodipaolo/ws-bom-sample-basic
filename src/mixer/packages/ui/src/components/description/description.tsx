import { getClassNames } from '@websolutespa/bom-core';
import { ILazyComponent, ILazyComponentProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Section, Text } from '@websolutespa/bom-mixer-ui';

export type DescriptionItem = ILazyComponent & {
  schema: 'text-1';
  description?: string;
};

export type DescriptionProps = ILazyComponentProps & {
  item: DescriptionItem;
};

export const Description: React.FC<DescriptionProps> = ({ item }: DescriptionProps) => {
  const classNames = getClassNames(item.schema);
  return (
    <Section className={classNames} padding="0 0 2rem 0">
      <Container maxWidthMd="80ch">
        {item.description &&
          <Box padding="2rem" border="2px solid var(--color-neutral-800)" borderRadius="var(--border-radius)">
            <Text variant="paragraph20" lineHeight="1.5" color="var(--color-neutral-500)" dangerouslySetInnerHTML={{ __html: item.description }} />
          </Box>
        }
      </Container>
    </Section>
  );
};

