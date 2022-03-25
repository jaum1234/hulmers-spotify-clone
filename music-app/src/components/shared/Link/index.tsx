import NextLink from 'next/link';
import React from 'react';
import { Link } from '../../types/link';

const styles = {
    color: "none",
    textDecoration: "none"
}

const Link = ({ children, href }: Link) => {
    return(
        <NextLink href={ href }>
            <a style={ styles }>{ children }</a>
        </NextLink>
    )
}

export default Link;