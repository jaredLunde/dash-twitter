<hr>
  <img src='https://github.com/dash-ui/styles/raw/main/assets/logo.png'/>
  <blockquote>A Twitter clone written using <a href="https://github.com/dash-ui/styles">Dash</a> and <a href="https://nextjs.org/">Next.js</a>.</blockquote>
<hr>

## Getting Started

### Set up the project

```bash
git clone https://github.com/jaredLunde/dash-twitter
cd dash-twitter
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Why do this?

I wanted to use a real world project to illustrate how powerful [@dash-ui](https://github.com/dash-ui) is. I truly
believe it to be a better styling solution than its competition (styled-components, emotion,
et. al.). Once you understand the patterns behind [@dash-ui](https://github.com/dash-ui), you'll agree with me that
this is the minimum effective abstraction for CSS-in-React.

## Scripts

| Script            | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| `dev`             | Runs the development server                                                   |
| `build`           | Builds a production Next.js app                                               |
| `build-storybook` | Builds a production Storybook app                                             |
| `check-types`     | Type checks the project                                                       |
| `lint`            | Runs ESLint on the project                                                    |
| `start`           | Builds a production Next.js app and runs it locally                           |
| `storybook`       | Runs a Storybook development server                                           |
| `test`            | Runs Jest on the project                                                      |
| `test:report`     | Runs Jest on the project and writes `junit.xml` file to the `.jest` directory |
| `up`              | Deploys the project in Vercel                                                 |
