export type Property = {
  type: "string" | "boolean" | "array"; // TODO: Clarify what types are expected
  defaultValue: string | boolean | unknown[]; // TODO: Clairfy if what 'array' type is
  description: string;
  secret: boolean;
  required: boolean;
};

export type ExampleJSON = {
  kind: string;
  name: string;
  steps: {
    name: string;
    image: string;
    settings: {
      [key: string]: string | string[];
    };
  }[];
};

export type PluginDataNoId = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  repo: string;
  image: string;
  description: string;
  example?: string;
  logo?: string;
  licence?: string;
  readme?: string;
  examples?: string;
  properties?: {
    [key: string]: Property;
  };
};

export type PluginData = PluginDataNoId & {
  id: string;
  cieExample?: string;
};

export type Path = {
  params: {
    id: string;
  };
};

