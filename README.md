# R-BASE (Rodriguez-Bevan Alphasynchronous Encryption)

The idea here is to create a new algorithm that is more secure than common integer-based algorithms. It will use rotated words, the dictionary for which differs for each contact. Once the words are rotated, we use a common encrytion algorithm to further protect the dictionary.

## Installation

You can install it globally with NPM or manually add it to your `PATH`.

`npm i -g r-base`

## Basic example

```
Hello, world.
```

```
Smorgasboard, zebra.
```

```
jA0EBwMCmUBDBladGsvw0koBm+TavfoUqpTQ54q0Zj0n24Z7WqahIXgRHYarEegK
BowCKb/jqff22dQ1LtChD9wGGgMkStEfCPRlRTbPQbVbnv5cUSf8n2wxHQ==
=8pWA
```

## Differences from common algorithms

The differentiating factor between word-shift or letter-shift algorithms and R-BASE is that the cipher dictionary is built on-the-fly and different for each recipient. Similar to PGP/GPG private keys, R-BASE keys are distributed on the individual level and no two keys are alike.

### Upsides

* unique keys per individual ensures privacy in conversations
* relies less on mathematical or logical algorithms and more on contextual or subjective ones (even if the cipher is decrypted, the resulting dictionary and its word-shifts must make sense)
* relatively simple

### Downsides

* still need to generate, share, and protect keys
* furthermore, if you also use PGP/GPG you'll have two keys per individual to maintain
* no central keyshare
* currently only uses the English language
* no automated decryption so the process is slow
* no testing yet so unsure if it's unbreakable (probably not)

## Components

The R-BASE utility comes with the following commands:

* `generate <words...>` which generates a new key in the current working directory
* `encrypt <string> --key <key>` encrypts text string with a key
* `decrypt <string> --key <key>` decrypts text string with a key

### Generate

In the spirit of trust, when generating a new key you will be prompted to enter at least three words about the recipient. These are open-ended and the program has no way to determine validity. The more words the stronger the encryption will be.

Key generation works as follows:

* three or more unique words are used to randomize the US English dictionary
* those same words are used to encrypt the shifted dictionary and produce the key in the format `rbase-word1-word2-word3-....key`
* the key is written to the current working directory

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