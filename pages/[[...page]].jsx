import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BuilderComponent,
  builder,
  useIsPreviewing,
  BuilderContent,
} from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import dynamic from "next/dynamic";

// Replace with your Public API Key
builder.init("b07842f39ed1400ebfcf46513c61c732");

export async function getStaticProps({ params }) {
  // Fetch the builder content
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  // Get a list of all pages in builder
  const pages = await builder.getAll("page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  };
}

// Client-side only BuilderComponent to avoid hydration issues
const ClientBuilderComponent = dynamic(
  () => import("@builder.io/react").then((mod) => mod.BuilderComponent),
  { ssr: false },
);

export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();
  const [isClient, setIsClient] = useState(false);

  // Only render BuilderComponent on the client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || "Solid Gold Stranger"}</title>
      </Head>

      {/* Use a client-side only component to avoid hydration mismatch */}
      {isClient ? (
        <ClientBuilderComponent
          model="page"
          content={page}
          contentLoaded={(data, content) => console.log({ data, content })}
        />
      ) : (
        <div style={{ minHeight: "100vh" }}>Loading content...</div>
      )}
    </>
  );
}
