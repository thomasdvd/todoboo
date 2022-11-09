# ToDoBoo 👻

Inspired by halloween.

made for Amcef

## Note

The application relies heavily on server state management and as such can have performance problems due to low latency. Ideally, considering the simplicity of the app, there would be also offline support with PWA functionality.

## Features

- Several routes
- Manage lists with (name and todos)
- ToDo
  - create
  - complete
  - delete
- Search
- Filter by status (active,completed,all)
- Data persistance layer using ~~mockapi.io~~ REST API

## Stack

- React 18
- [Next.js 13](https://beta.nextjs.org/docs)
- @tanstack/react-query for server side state management
- DaisyUI with halloween theme
- tailwindcss
- others...

## About

I am taking this project as a opportunity to try the new Next.js 13 with experimental app directory. The master (`assignment`) branch will not feature new features like server components. Later I might create another branch to try out a full-stack application using Next.js 13.

## Deployment

deployed on vercel

## Conclusions

Next.js app directory is still experimental and not suited to production. The new data loading possibilities bring a lot of improvements especially in case of loading states.

## Found issues

- Warning [resource preloaded...](https://github.com/vercel/next.js/issues/6517)
