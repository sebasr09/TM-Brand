import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, darken, styled } from '@mui/material/styles';
import Colors from '../../constants/Colors';

const Root = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  color: Colors.primary,
  wordBreak: 'break-word',
  '& .anchor-link': {
    marginTop: -96, // Offset for the anchor.
    position: 'absolute',
  },
  '& pre': {
    margin: theme.spacing(2, 'auto'),
    padding: theme.spacing(2),
    colorScheme: 'dark',
    direction: 'ltr',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    maxWidth: 'calc(100vw - 32px)',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100vw - 32px - 16px)',
    },
  },
  '& code, & code[class*="language-"]': {
    direction: 'ltr',
    display: 'inline-block',
    ...theme.typography.body2,
    fontSize: theme.typography.pxToRem(13),
    fontFamily: theme.typography.fontFamilyCode,
    fontWeight: 400,
    WebkitFontSmoothing: 'subpixel-antialiased',
    padding: '0 5px',
    borderRadius: 5,
  },
  // inline code
  '& code': {
    color: Colors.primary,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
  },
  // block code
  '& code[class*="language-"]': {
    color: '#fff',
  },
  '& h1': {
    ...theme.typography.h3,
    fontSize: theme.typography.pxToRem(40),
    fontFamily: `"PlusJakartaSans-ExtraBold", ${theme.typography.fontFamilySystem}`,
    margin: '16px 0',
    fontWeight: 800,
  },
  '& .description': {
    ...theme.typography.h6,
    fontWeight: 400,
    margin: '0 0 40px',
  },
  '& h2': {
    ...theme.typography.h5,
    fontSize: theme.typography.pxToRem(30),
    fontFamily: `"PlusJakartaSans-Bold", ${theme.typography.fontFamilySystem}`,
    fontWeight: 700,
    margin: '40px 0 10px',
  },
  '& h3': {
    ...theme.typography.h6,
    margin: '20px 0 10px',
    fontFamily: `"PlusJakartaSans-Bold", ${theme.typography.fontFamilySystem}`,
    fontWeight: 700,
  },
  '& h4': {
    ...theme.typography.h6,
    margin: '10px 0 16px',
  },
  '& h5': {
    ...theme.typography.subtitle2,
    margin: '10px 0 16px',
  },
  '& p, & ul, & ol': {
    marginTop: 0,
    marginBottom: 16,
  },
  '& ul': {
    ...(theme.direction === 'rtl' && {
      paddingRight: 30,
    }),
    ...(theme.direction !== 'rtl' && {
      paddingLeft: 30,
    }),
  },
  '& h1, & h2, & h3, & h4': {
    '& code': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      // Remove scroll on small screens.
      wordBreak: 'break-all',
    },
    '& .anchor-link-style': {
      // To prevent the link to get the focus.
      display: 'none',
    },
    '& a:not(.anchor-link-style):hover': {
      color: 'currentColor',
      borderBottom: '1px solid currentColor',
      textDecoration: 'none',
    },
    '&:hover .anchor-link-style': {
      display: 'inline-block',
      padding: '0 8px',
      color: Colors.secondary,
      '&:hover': {
        color: Colors.primary,
      },
      '& svg': {
        width: '0.7em',
        height: '0.7em',
        fill: 'currentColor',
      },
    },
  },
  '& h2 code': {
    fontSize: theme.typography.pxToRem(27),
    fontWeight: theme.fontWeightBold,
  },
  '& table': {
    // Trade display table for scroll overflow
    display: 'block',
    wordBreak: 'normal',
    width: '100%',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    borderCollapse: 'collapse',
    marginBottom: '20px',
    borderSpacing: 0,
    '& .prop-name, & .prop-type, & .prop-default': {
      fontWeight: 400,
      WebkitFontSmoothing: 'subpixel-antialiased',
      fontSize: theme.typography.pxToRem(13),
    },
    '& .prop-default': {
      borderBottom: `1px dotted ${theme.palette.divider}`,
    },
  },
  '& td': {
    ...theme.typography.body2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 20,
    color: Colors.primary,
  },
  '& td code': {
    lineHeight: 1.6,
  },
  '& th': {
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium,
    color: Colors.primary,
    whiteSpace: 'pre',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 20,
  },
  '& blockquote': {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    padding: '10px 20px',
    margin: '20px 0',
    '& p': {
      marginTop: 10,
    },
  },
  '& a, & a code': {
    // Style taken from the Link component
    textDecoration: 'underline',
    textDecorationColor: alpha(theme.palette.primary.main, 0.4),
    '&:hover': {
      textDecorationColor: 'inherit',
    },
  },
  '& a code': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : darken(theme.palette.primary.main, 0.04),
  },
  '& img, video': {
    maxWidth: '100%',
  },
  '& img': {
    // Avoid layout jump
    display: 'inline-block',
  },
  '& hr': {
    height: 1,
    margin: theme.spacing(6, 0),
    border: 0,
    flexShrink: 0,
  },
  '& kbd.key': {
    // Style taken from GitHub
    padding: '4px 5px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    margin: '0 1px',
    font: '11px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
    lineHeight: '10px',
    color: Colors.primary,
    verticalAlign: 'middle',
    borderRadius: 5,
  },
  '& details': {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(0.5, 0, 0.5, 1),
    '& summary': {
      cursor: 'pointer',
    },
    '& pre': {
      marginTop: theme.spacing(1),
    },
  },
}));

const MarkdownElement = React.forwardRef(function MarkdownElement(props, ref) {
  const { className, renderedMarkdown, ...other } = props;
  const more = {};

  if (typeof renderedMarkdown === 'string') {
    // workaround for https://github.com/facebook/react/issues/17170
    // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
    more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
  }

  return <Root className={clsx('markdown-body', className)} {...more} {...other} ref={ref} />;
});

MarkdownElement.propTypes = {
  className: PropTypes.string,
  renderedMarkdown: PropTypes.string,
};

export default MarkdownElement;