This app is meant to be a way to learn and practice using new vocabulary. Currently, we are using an awesome [NodeJS wrapper for using the oxford dictionary api](https://www.npmjs.com/package/oxford-dictionary).

As an mvp, this app should allow users to look up definitions and usages of new vocabulary words. There will then be a second part of the application added that will use the words that have been looked up in a quiz of some sort.

TODO:

- parse response from API - Massage data to give us words and definitions only. Not tripping for now about word origin, etc
- in API response, some definitions don't have .
- create markup to present resposne from API to screen
- Think about using Oxford for Spanish also

Each example and definition has an id. We'd need to match these up in order to place them together.
