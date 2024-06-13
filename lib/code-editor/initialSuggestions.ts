import { languages } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { EditorSuggestion } from './suggestions';

const initialPropSuggestions: EditorSuggestion[] = [
  {
    label: 'Hostname',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'Hostname',
    description: 'Hostname that will be used to make the request',
    hoverDescription: [
      {
        value: '(property) Hostname',
      },
      {
        value: `**Hostanme is a property that is used to set the hostname of the request**.`,
      },
      {
        value: 'Example: **`example.com:80`** (it includes port number)',
      },
    ],
  },

  {
    label: 'CalculatedContentLength',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'CalculatedContentLength',
    description: 'Calculated length of the body before we send the request',
    hoverDescription: [
      {
        value: '(property) CalculatedContentLength',
      },
      {
        value: `**CalculatedContentLength will be replaced with actual length of the body after we replace all other variables**.`,
      },
      {
        value: 'Example: **`23321`**',
      },
    ],
  },

  {
    label: 'RandomUserAgent',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'RandomUserAgent',
    description: 'Random user agent',
    hoverDescription: [
      {
        value: '(property) RandomUserAgent',
      },
      {
        value: `**RandomUserAgent will be replaced with one of 30 user agents**.`,
      },
      {
        value:
          'Example: **`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36`**',
      },
    ],
  },
  {
    label: 'BasePath',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'BasePath',
    description: 'Random user agent',
    hoverDescription: [
      {
        value: '(property) BasePath',
      },
      {
        value: `**BasePath will be replaced with path from single target**.`,
      },
      {
        value:
          'Example: When user provides a https://example.com/test/123 as target when running the module, the BasePath will be **`/test/123`**',
      },
    ],
  },

  {
    label: 'InteractionURL',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'InteractionURL',
    description: 'Unique URL that will be used to detect remote interactions',
    hoverDescription: [
      {
        value: '(property) InteractionURL',
      },
      {
        value: `**InteractionURL works the same as Burp Collaborator - it generates unique URL and it will listen for requests to that URL**.`,
      },
      {
        value: `*Supported protocols: DNS, HTTP (for LDAP protocol use InteractionLDAP property insted)*.`,
      },
      {
        value: 'Example: **`3912931skk4.vidoctesting.com`**',
      },
    ],
  },
  {
    label: 'InteractionLDAP',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'InteractionLDAP',
    description: 'Remote interactions URL for LDAP protocol',
    hoverDescription: [
      {
        value: '(property) InteractionLDAP',
      },
      {
        value: `**InteractionLDAP works the same as Burp Collaborator - it generates unique URL and it will listen for requests to that URL**.`,
      },
      {
        value: `*It works only on LDAP protocol. To listen on different protocols use InteractionURL property*.`,
      },
      {
        value:
          'Example: **`3912931skk4.vidoctesting.com:389/3912931skk4`** - note that it will contain port number and LDAP path',
      },
    ],
  },
  {
    label: 'IP',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'IP',
    description: 'IP address of the host',
    hoverDescription: [
      {
        value: '(property) IP',
      },
      {
        value: `**It is the IP address that we will send request to**.`,
      },
      {
        value: 'Example: **`112.23.232.213`**',
      },
    ],
  },
  {
    label: 'Port',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'Port',
    description: 'Port that will be used to make request',
    hoverDescription: [
      {
        value: '(property) Port',
      },
      {
        value: `**It is the Port that we will send request to**.`,
      },
      {
        value: 'Example: **`443`**',
      },
    ],
  },
  {
    label: 'Scheme',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'Scheme',
    description: 'Scheme that will be used to make request',
    hoverDescription: [
      {
        value: '(property) Scheme',
      },
      {
        value: `**It is the Scheme that we will send request to**.`,
      },
      {
        value: 'Example: **`https`**, **`http`**',
      },
    ],
  },
  {
    label: 'RootURL',
    kind: languages.CompletionItemKind.Variable,
    insertText: 'RootURL',
    description: 'Full url of the request (without path)',
    hoverDescription: [
      {
        value: '(property) RootURL',
      },
      {
        value: `**It is the RootURL that we will send request to**.`,
      },
      {
        value: 'Example: **`https://google.com:443`**',
      },
    ],
  },
  {
    label: 'md5',
    kind: languages.CompletionItemKind.Function,
    insertText: 'md5',
    description: 'md5 function',
    hoverDescription: [
      {
        value: '(function) md5(string)',
      },
      {
        value: `**It is the RootURL that we will send request to**.`,
      },
      {
        value: 'Example: **`https://google.com:443`**',
      },
    ],
  },
  {
    label: 'len',
    kind: languages.CompletionItemKind.Function,
    insertText: 'len',
    description: 'len function',
    hoverDescription: [
      {
        value: '(function) len(any)',
      },
      {
        value: `**Returns length of given value**.`,
      },
      {
        value: 'Example: **`len("test") -> 4`**',
      },
    ],
  },
  {
    label: 'toUpper',
    kind: languages.CompletionItemKind.Function,
    insertText: 'toUpper',
    description: 'toUpper function',
    hoverDescription: [
      {
        value: '(function) toUpper(string)',
      },
      {
        value: `**Makes string uppercase**.`,
      },
      {
        value: 'Example: **`toUpper("aa") -> "AA"`**',
      },
    ],
  },
  {
    label: 'toLower',
    kind: languages.CompletionItemKind.Function,
    insertText: 'toLower',
    description: 'toLower function',
    hoverDescription: [
      {
        value: '(function) toLower(string)',
      },
      {
        value: `**Makes string uppercase**.`,
      },
      {
        value: 'Example: **`toLower("AAA") -> "aaa"`**',
      },
    ],
  },
  {
    label: 'replace',
    kind: languages.CompletionItemKind.Function,
    insertText: 'replace',
    description: 'replace function',
    hoverDescription: [
      {
        value: '(function) replace(string, string, string)',
      },
      {
        value: `**Replaces string in a text**.`,
      },
      {
        value: 'Example: **`replace("some text", "some", "my") -> "my text"`**',
      },
    ],
  },
  {
    label: 'replaceRegex',
    kind: languages.CompletionItemKind.Function,
    insertText: 'replaceRegex',
    description: 'replaceRegex function',
    hoverDescription: [
      {
        value: '(function) replaceRegex(string, string, string)',
      },
      {
        value: `**Replaces using regex in a text**.`,
      },{
        value: 'For more information about regex check: https://regex101.com/ (select Golang in the flavour dropdown)'
      },
      {
        value:
          'Example: **`replaceRegex("somsomsom text", "(som)+", "test") -> "testtesttest text"`**',
      },
    ],
  },
  {
    label: 'split',
    kind: languages.CompletionItemKind.Function,
    insertText: 'split',
    description: 'split function',
    hoverDescription: [
      {
        value: '(function) split(string, string)',
      },
      {
        value: `**Splits string by delimiter**.`,
      },
      {
        value: 'Example: **`split("foo text", " ") -> ["foo", "text"]`**',
      },
    ],
  },
  {
    label: 'trim',
    kind: languages.CompletionItemKind.Function,
    insertText: 'trim',
    description: 'trim function',
    hoverDescription: [
      {
        value: '(function) trim(string)',
      },
      {
        value: `**Trims string - removes whitespaces at the start and at the end**.`,
      },
      {
        value: 'Example: **`trim(" foo text ") -> "foo text"`**',
      },
    ],
  },
  {
    label: 'trimLeft',
    kind: languages.CompletionItemKind.Function,
    insertText: 'trimLeft',
    description: 'trimLeft function',
    hoverDescription: [
      {
        value: '(function) trimLeft(string)',
      },
      {
        value: `**Trims string at the start - removes whitespaces at the start**.`,
      },
      {
        value: 'Example: **`trimLeft("  foo text") -> "foo text"`**',
      },
    ],
  },
  {
    label: 'trimRight',
    kind: languages.CompletionItemKind.Function,
    insertText: 'trimRight',
    description: 'trimRight function',
    hoverDescription: [
      {
        value: '(function) trimRight(string)',
      },
      {
        value: `**Trims string at the end - removes whitespaces at the end**.`,
      },
      {
        value: 'Example: **`trimRight("foo text   ") -> "foo text"`**',
      },
    ],
  },
  {
    label: 'reverse',
    kind: languages.CompletionItemKind.Function,
    insertText: 'reverse',
    description: 'reverse function',
    hoverDescription: [
      {
        value: '(function) reverse(string)',
      },
      {
        value: `**Reverses order of letters in string**.`,
      },
      {
        value: 'Example: **`reverse("hey") -> "yeh"`**',
      },
    ],
  },
  {
    label: 'base64',
    kind: languages.CompletionItemKind.Function,
    insertText: 'base64',
    description: 'base64 function',
    hoverDescription: [
      {
        value: '(function) base64(string)',
      },
      {
        value: `**Base64 encode text**.`,
      },
      {
        value: 'Example: **`base64("hey") -> "aGV5"`**',
      },
    ],
  },
  {
    label: 'base64Decode',
    kind: languages.CompletionItemKind.Function,
    insertText: 'base64Decode',
    description: 'base64Decode function',
    hoverDescription: [
      {
        value: '(function) base64Decode(string)',
      },
      {
        value: `**base64Decode decode text**.`,
      },
      {
        value: 'Example: **`base64Decode("aGV5") -> "hey"`**',
      },
    ],
  },
  {
    label: 'base64Py',
    kind: languages.CompletionItemKind.Function,
    insertText: 'base64Py',
    description: 'base64Py function',
    hoverDescription: [
      {
        value: '(function) base64Py(string)',
      },
      {
        value: `**base64Py encodes to base64 with lines of 76 bytes terminated by new line**.`,
      },
    ],
  },
  {
    label: 'urlEncode',
    kind: languages.CompletionItemKind.Function,
    insertText: 'urlEncode',
    description: 'urlEncode function',
    hoverDescription: [
      {
        value: '(function) urlEncode(string)',
      },
      {
        value: `**urlEncode encodes text as URL**.`,
      },
      {
        value:
          'Example: **`urlEncode("aaaa=sad12312?sadlsald=rft") -> "aaaa%3Dsad12312%3Fsadlsald%3Drft"`**',
      },
    ],
  },
  {
    label: 'urlDecode',
    kind: languages.CompletionItemKind.Function,
    insertText: 'urlDecode',
    description: 'urlDecode function',
    hoverDescription: [
      {
        value: '(function) urlDecode(string)',
      },
      {
        value: `**urlDecode decodes text as URL**.`,
      },
      {
        value:
          'Example: **`urlDecode("aaaa%3Dsad12312%3Fsadlsald%3Drft") -> "aaaa=sad12312?sadlsald=rft"`**',
      },
    ],
  },
  {
    label: 'hexEncode',
    kind: languages.CompletionItemKind.Function,
    insertText: 'hexEncode',
    description: 'hexEncode function',
    hoverDescription: [
      {
        value: '(function) hexEncode(string)',
      },
      {
        value: `**hexEncode encodes text as hex**.`,
      },
      {
        value: 'Example: **`hexEncode("test") -> "74657374"`**',
      },
    ],
  },
  {
    label: 'hexDecode',
    kind: languages.CompletionItemKind.Function,
    insertText: 'hexDecode',
    description: 'hexDecode function',
    hoverDescription: [
      {
        value: '(function) hexDecode(string)',
      },
      {
        value: `**hexDecode decodes from HEX to string**.`,
      },
      {
        value: 'Example: **`hexDecode("74657374") -> "test"`**',
      },
    ],
  },
  {
    label: 'htmlEscape',
    kind: languages.CompletionItemKind.Function,
    insertText: 'htmlEscape',
    description: 'htmlEscape function',
    hoverDescription: [
      {
        value: '(function) htmlEscape(string)',
      },
      {
        value: `**htmlEscape escapes special characters like "<" to become "&lt;". It escapes only five such characters: <, >, &, ' and "**.`,
      },
      {
        value: 'Example: **`htmlEscape("<test>") -> "&lt;test&gt;"`**',
      },
    ],
  },
  {
    label: 'htmlUnescape',
    kind: languages.CompletionItemKind.Function,
    insertText: 'htmlUnescape',
    description: 'htmlUnescape function',
    hoverDescription: [
      {
        value: '(function) htmlUnescape(string)',
      },
      {
        value: `**htmlUnescape unescapes entities like "&lt;" to become "<"**.`,
      },
      {
        value: 'Example: **`htmlUnescape("&lt;test&gt;") -> "<test>"`**',
      },
    ],
  },
  {
    label: 'sha256',
    kind: languages.CompletionItemKind.Function,
    insertText: 'sha256',
    description: 'sha256 function',
    hoverDescription: [
      {
        value: '(function) sha256(string)',
      },
      {
        value: `**sha256 generates sha256 hash of given string**.`,
      },
      {
        value:
          'Example: **`sha256("test") -> "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"`**',
      },
    ],
  },
  {
    label: 'sha1',
    kind: languages.CompletionItemKind.Function,
    insertText: 'sha1',
    description: 'sha1 function',
    hoverDescription: [
      {
        value: '(function) sha1(string)',
      },
      {
        value: `**sha1 generates sha1 hash of given string**.`,
      },
      {
        value:
          'Example: **`sha1("test") -> "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"`**',
      },
    ],
  },
  {
    label: 'mmh3',
    kind: languages.CompletionItemKind.Function,
    insertText: 'mmh3',
    description: 'mmh3 function',
    hoverDescription: [
      {
        value: '(function) mmh3(string)',
      },
      {
        value: `**mmh3 generates mmh3 hash of given string**.`,
      },
      {
        value: 'Example: **`mmh3("test") -> "3127628307"`**',
      },
    ],
  },
  {
    label: 'contains',
    kind: languages.CompletionItemKind.Function,
    insertText: 'contains',
    description: 'contains function',
    hoverDescription: [
      {
        value: '(function) contains(string, string): boolean',
      },
      {
        value: `**contains returns bool if substring is in a string**.`,
      },
      {
        value: 'Example: **`contains("test", "te") -> true`**',
      },
    ],
  },
  {
    label: 'regex',
    kind: languages.CompletionItemKind.Function,
    insertText: 'regex',
    description: 'regex function',
    hoverDescription: [
      {
        value: '(function) regex(string, string): boolean',
      },
      {
        value: `**regex returns bool if regex matched a string**.`,
      },
      {
        value: 'Example: **`regex("test", "(te)+") -> true`**',
      },
    ],
  },
  {
    label: 'randChar',
    kind: languages.CompletionItemKind.Function,
    insertText: 'randChar',
    description: 'randChar function',
    hoverDescription: [
      {
        value: '(function) randChar(string): string',
      },
      {
        value: `**randChar returns random character from string**.`,
      },
      {
        value: 'Example: **`randChar("test") -> "t"`**',
      },
    ],
  },
  {
    label: 'randTextAlpha',
    kind: languages.CompletionItemKind.Function,
    insertText: 'randTextAlpha',
    description: 'randTextAlpha function',
    hoverDescription: [
      {
        value: '(function) randTextAlpha(number): string',
      },
      {
        value: `**randTextAlpha returns random text with only alphabet characters**.`,
      },
      {
        value: 'Example: **`randTextAlpha(4) -> "asdd"`**',
      },
    ],
  },
  {
    label: 'randInt',
    kind: languages.CompletionItemKind.Function,
    insertText: 'randInt',
    description: 'randInt function',
    hoverDescription: [
      {
        value: '(function) randInt(number, number): string',
      },
      {
        value: `**randInt returns random int between two numbers**.`,
      },
      {
        value: 'Example: **`randInt(0, 10) -> 3`**',
      },
    ],
  },
  {
    label: 'stringify',
    kind: languages.CompletionItemKind.Function,
    insertText: 'stringify',
    description: 'stringify function',
    hoverDescription: [
      {
        value: '(function) stringify(any): string',
      },
      {
        value: `**stringify tries to make a string from ANY input**.`,
      },
      {
        value: 'Example: **`stringify(10) -> "10"`**',
      },
    ],
  },
];
export { initialPropSuggestions };
