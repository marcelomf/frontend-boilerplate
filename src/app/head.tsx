'use client'

import { useEffect } from "react";

export default function HeadSEO({title, description, ogImage}) {
    let location;
    let canonicalURL;
    useEffect(() => {
        location = window.location;
        canonicalURL = new URL(location.pathname, location.href); 
    },[]);

    return (
        <>
            <meta charSet="utf-8" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="generator" content="NextJS" />
            <link rel="canonical" href={canonicalURL} />
            <link
            rel="shortcut icon"
            type="image/svg+xml"
            href={`/favicon.svg`}
            />
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalURL} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalURL} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />
        </>
    )
}


