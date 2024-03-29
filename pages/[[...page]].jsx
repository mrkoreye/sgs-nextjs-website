import React from "react";
import { useRouter } from "next/router";
import {
  BuilderComponent,
  builder,
  useIsPreviewing,
  BuilderContent,
} from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";

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

export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent
        model="page"
        content={page}
        contentLoaded={(data, content) => console.log({ data, content })}
      />

      {/* <BuilderComponent
        model="page"
        content={page}
        contentLoaded={(data, content) => {
          window.BUILDER_CONTENT_DATA = data;
          setTimeout(() => {
            if (window.BUILDER_CONTENT_DATA) {
              console.log("Builder data: ", window.BUILDER_CONTENT_DATA);
              window.BUILDER_CONTENT_DATA = null;
            }
          }, 3000);
        }}
      /> */}
    </>
  );
}
