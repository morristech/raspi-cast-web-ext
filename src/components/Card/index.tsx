import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';

interface CardProps {
  title?: string;
  description?: string;
  thumbnail?: string;
  url?: string;
}

export const Card: React.SFC<CardProps> = ({
  thumbnail,
  title,
  description,
  url,
}) => (
  <CardWrapper>
    <Title>{title}</Title>
    <Thumb src={thumbnail} alt={title} />
    <Link href={url} target="_blank" />
  </CardWrapper>
);

const CardWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
  padding: '10px 10px',
}));

const Thumb = glamorous.img({
  width: '100%',
  height: 'auto',
});

const Title = glamorous.h1<WithTheme>(({ theme }) => ({
  fontSize: theme.textSizeLg,
}));

const Link = glamorous.a({});
