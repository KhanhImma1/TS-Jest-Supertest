# Testing API of UrlBae with Jest & SuperTest
This project is an example of API tests using TypeScript, [Jest](https://jestjs.io/docs/getting-started) and [SuperTest](https://www.npmjs.com/package/supertest) on [UrlBae](https://urlbae.com) document.

## Tech Stack
* TypeScript
* Jest
* SuperTest
* ts-jest

## Requirements
* node >= 18.x
* npm >= 9.5.x

## Getting started
Clone to local:

```
git clone https://github.com/KhanhImma1/TS-Jest-Supertest.git
```

Install the dependencies:

```
npm install
```

Run all of tests:

```
npm run test
```

Run test with the specific environment:

```
npm run test:qa
```

Run test by files:

```
npx jest post_campaign
```

```
npx jest put_channel
```

```
npx jest get_all_pixels
```
