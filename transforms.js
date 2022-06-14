
    /**
     * Format for css typography classes
     * This generates theme-independent css classes so we're fine with just using css variables here
     * We're using the css shorthand to define the font: property and define all other values according to the typography token
     */
     StyleDictionary.registerFormat({
      name: "css/typographyClasses",
      formatter: (dictionary, config) => (dictionary.allProperties.map((prop) => (`
  .${prop.name} {
      font: var(--${prop.name});
      letter-spacing: ${convertToVariableIfNeeded(
      prop.original.value.letterSpacing
      )};
      text-transform: ${convertToVariableIfNeeded(prop.original.value.textCase)};
      text-decoration: ${convertToVariableIfNeeded(
      prop.original.value.textDecoration
      )};
  }`)).join("\n"))
  });


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

  /**
   * Transform shadow shorthands for css variables
   */
  StyleDictionary.registerTransform({
      name: "shadow/shorthand",
      type: "value",
      transitive: true,
      matcher: (token) => ["boxShadow"].includes(token.type),
      transformer: (token) => {
      return Array.isArray(token.original.value)
          ? token.original.value.map((single) => transformShadow(single)).join(", ")
          : transformShadow(token.original.value);
      },
  });
