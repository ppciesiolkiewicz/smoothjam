/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

export default class RootDocument extends Document {
    static getInitialProps({ renderPage }) {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialSheets = new ServerStyleSheets();
        const page = renderPage(App => props => (
            styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
        ));
        const styledStyleTags = styledComponentsSheet.getStyleElement();
        const materialStyleTags = materialSheets.getStyleElement();

        return { ...page, styledStyleTags, materialStyleTags };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    {this.props.styledStyleTags}
                    {this.props.materialStyleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
