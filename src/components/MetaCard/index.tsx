import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';

interface MetaCardProps {
  title?: string;
  description?: string;
  thumbnail?: string;
  url?: string;
}

export const MetaCard: React.SFC<MetaCardProps> = ({
  thumbnail,
  title,
  description,
  url,
}) => (
  <Card>
    <Thumb src={thumbnail} alt={title} />
    <TextWrapper>
      <Title>{title}</Title>
      <Link href={url} target="_blank" />
    </TextWrapper>
  </Card>
);

const Card = glamorous.div<WithTheme>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'spaceBetween',
  padding: '10px 10px',
}));

const Thumb = glamorous.img({
  width: '100%',
  height: 'auto',
});

const TextWrapper = glamorous.div({
  padding: '5px 5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Title = glamorous.h1<WithTheme>(({ theme }) => ({
  fontSize: theme.textSizeLg,
}));

const Link = glamorous.a({});
