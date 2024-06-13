const LEGACY_NAME_MAP: {
  [key: string]: string;
} = {
  len: "len",
  toupper: "toUpper",
  tolower: "toLower",
  sort: "sort",
  replace: "replace",
  replace_regex: "replaceRegex",
  split: "split",
  trim: "trim",
  trim_left: "trimLeft",
  trim_right: "trimRight",
  trim_space: "trimSpace",
  trim_prefix: "trimPrefix",
  trim_suffix: "trimSuffix",
  reverse: "reverse",
  base64: "base64",
  base64_decode: "base64Decode",
  base64_py: "base64Py",
  url_encode: "urlEncode",
  url_decode: "urlDecode",
  hex_encode: "hexEncode",
  hex_decode: "hexDecode",
  html_escape: "htmlEscape",
  html_unescape: "htmlUnescape",
  md5: "md5",
  sha256: "sha256",
  sha1: "sha1",
  mmh3: "mmh3",
  contains: "contains",
  regex: "regex",
  rand_char: "randChar",
  rand_base: "randBase",
  rand_text_alphanumeric: "randTextAlphanumeric",
  rand_text_alpha: "randTextAlpha",
  rand_text_numeric: "randTextNumeric",
  rand_int: "randInt",
  unixtime: "unixtime",
  generate_java_gadget: "generateJavaGadget",
  stringify: "stringify",
  normalizeObjectKeys: "normalizeObjectKeys",
} as const;

const TYPES = ["string", "number", "boolean", "any", "string[]"] as const;
const RETURN_NUMBER = -213213123;

const validate = (
  name: string,
  accepts: string[],
  returns: string | boolean | number
) => {
  return (...args: any[]): [any, string | null] => {
    if (args.length !== accepts.length) {
      return [
        null,
        `Function ${name} accepts ${accepts.length} arguments, got ${args.length}`,
      ];
    }

    for (let i = 0; i < args.length; i++) {
      // this is a literal type
      if (!TYPES.includes(args[i]) && typeof args[i] === accepts[i]) {
        continue;
      }

      if (args[i] === RETURN_NUMBER) {
        continue;
      }

      if (args[i] !== accepts[i] && accepts[i] !== "any") {
        return [
          null,
          `Function ${name} accepts ${accepts[i]} as argument ${i}, got ${args[i]}`,
        ];
      }
    }

    return [returns, null];
  };
};

const FUNCTIONS_MAP = {
  len: validate("len", ["any"], RETURN_NUMBER),
  toUpper: validate("toUpper", ["string"], "string"),
  toLower: validate("toLower", ["string"], "string"),
  replace: validate("replace", ["string", "string", "string"], "string"),
  replaceRegex: validate(
    "replaceRegex",
    ["string", "string", "string"],
    "string"
  ),
  split: validate("split", ["string", "string"], "string[]"),
  trim: validate("trim", ["string"], "string"),
  trimLeft: validate("trimLeft", ["string"], "string"),
  trimRight: validate("trimRight", ["string"], "string"),
  trimSpace: validate("trimSpace", ["string"], "string"),
  trimPrefix: validate("trimPrefix", ["string", "string"], "string"),
  trimSuffix: validate("trimSuffix", ["string", "string"], "string"),
  reverse: validate("reverse", ["string"], "string"),
  base64: validate("base64", ["string"], "string"),
  base64Decode: validate("base64Decode", ["string"], "string"),
  base64Py: validate("base64Py", ["string"], "string"),
  urlEncode: validate("urlEncode", ["string"], "string"),
  urlDecode: validate("urlDecode", ["string"], "string"),
  hexEncode: validate("hexEncode", ["string"], "string"),
  hexDecode: validate("hexDecode", ["string"], "string"),
  htmlEscape: validate("htmlEscape", ["string"], "string"),
  htmlUnescape: validate("htmlUnescape", ["string"], "string"),
  md5: validate("md5", ["string"], "string"),
  sha256: validate("sha256", ["string"], "string"),
  sha1: validate("sha1", ["string"], "string"),
  mmh3: validate("mmh3", ["string"], "string"),
  contains: validate("contains", ["string", "string"], true),
  regex: validate("regex", ["string", "string"], true),
  randChar: validate("randChar", ["string"], "string"),
  randBase: validate("randBase", ["string"], "string"),
  randTextAlphanumeric: validate("randTextAlphanumeric", ["number"], "string"),
  randTextAlpha: validate("randTextAlpha", ["number"], "string"),
  randTextNumeric: validate("randTextNumeric", ["number"], "string"),
  randInt: validate("randInt", ["number", "number"], RETURN_NUMBER),
  unixtime: validate("unixtime", [], RETURN_NUMBER),
  generateJavaGadget: validate("generateJavaGadget", ["string"], "string"),
  stringify: validate("stringify", ["any"], "string"),
  normalizeObjectKeys: validate("normalizeObjectKeys", ["any"], "any"),
};

const REQUEST_VARIABLES = {
  BaseURL: "string",
  RootURL: "string",
  Hostname: "string",
  IP: "string",
  Host: "string",
  Port: "number",
  Scheme: "string",
  BasePath: "string",
  RandomUserAgent: "string",
};

// these are used in matcher type dsl
const DSL_MATCHER_VARIABLES = {
  host: "string",
  body: "string",
  content_length: "number",
  all_headers: "string",
  duration: "number",
  status_code: "number",
  response: "string",
};

export {
  LEGACY_NAME_MAP,
  FUNCTIONS_MAP,
  REQUEST_VARIABLES,
  DSL_MATCHER_VARIABLES,
};
