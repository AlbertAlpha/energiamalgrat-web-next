import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.WORDPRESS_URL}/graphql`,
  documents: "src/server/graphql/documents/*.ts",
  generates: {
    "src/server/graphql/generated/client.ts": {
      config: {
        skipTypename: true,
        avoidOptionals: true,
        maybeValue: "T",
        useTypeImports: true,
        emitLegacyCommonJSImports: false,
        documentMode: "documentNode",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
