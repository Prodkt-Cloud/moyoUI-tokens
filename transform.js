/**
 * Transform typography shorthands for css variables
 */
 StyleDictionary.registerTransform({
    name: "typography/shorthand",
    type: "value",
    transitive: true,
    matcher: (token) => token.type === "typography",
    transformer: (token) => {
      const {fontWeight, fontSize, lineHeight, fontFamily} = token.original.value;
      return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
    },
  });