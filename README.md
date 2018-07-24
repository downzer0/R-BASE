# R-BASE (Rod-Bev Alphasynchronous Encryption)

This experiment creates a cryptographic algorithm for text encryption. It explores non-integer (and ideally less logical) methods to encrypt plain text. It uses rotated words, the dictionary of which differs for each contact. Once the words are rotated, we use a common encrytion algorithm to further protect the dictionary.

Unofficial words like those commonly found in text messages or memes will not be replaced, but will stay in the message as-is. This is intentional and may even make the nonsensical output even more nonsensical.

__It is still in progress.__

## Installation

Clone this repository and run one of:

* `npm run generate`
* `npm run encrypt -- --string <string> --key <keyfile>`
* `npm run decrypt -- --string <string> --key <keyfile>`

## Basic example

```
Hello, world.
```

```
Smorgasboard, zebra.
```

## Upsides

* unique keys per individual ensures privacy in conversations
* relies less on mathematical or logical algorithms and more on contextual or subjective ones (even if the cipher is decrypted, the resulting dictionary and its word-shifts must make sense)
* relatively simple

## Downsides

* still need to generate, share, and protect keys
* furthermore, if you also use PGP/GPG you'll have two keys per individual to maintain
* no central keyshare
* currently only uses the English language
* no automated decryption so the process is slow
* no testing yet so unsure if it's unbreakable (probably not)

## Components

The R-BASE utility comes with the following commands:

* `generate <words...>` which generates a new key in specified directory
* `encrypt --string <string> --key <key>` encrypts text string with a key
* `decrypt --string <string> --key <key>` decrypts text string with a key

### Generate

In the spirit of trust, when generating a new key you will be prompted to enter at least three words about the recipient. These are open-ended and the program has no way to determine validity. The words provide a 'score' which determines how to shift the dictionaries.

Key generation works as follows:

* three or more unique words are used to randomize the US English dictionary
* those same words are used to encrypt the shifted dictionary and produce the key in the format `rbase-word1-word2-word3-....key`
* the key is written to specified directory

## Encryption

The R-BASE tool is a command line tool only currently. It takes an input text string and encrypts the string with the supplied key previously generated. Encryption works as follows:

* string of text is passed in with the command
* words in the text are shifted according to the key being used
* output of nonsensical words may optionally be encrypted using PGP/GPG key (not included; normal PGP/GPG key rules apply)

## Decryption

Decrypting is the reverse of encryption in that:

* a string of text is passed in with the command
* words in the text are re-shifted according to the key being used
* output of original message is displayed

## Disclaimer

__This is an experiment and should not be used for any serious encryption.__