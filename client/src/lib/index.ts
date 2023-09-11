type SchemaOpts = {
  uri: string;
  schema: "atom" | "http" | "https";
};
export const fileSchema2 = (opts: SchemaOpts) => {
  const { uri, schema } = opts;
  return schema + "://" + uri;
};

export const fileSchemaUrl = (uri: string) => {
  return "atom://" + uri;
};

export const videoSchemaUrl = (uri: string) => {
  return "video://" + uri;
};
