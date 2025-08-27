# Energia Malgrat Web

This is the project running the website [energiamalgrat.cat](https://www.energiamalgrat.cat) wich is a non-profit citizens’ association created with the goal of promoting a new energy model in the town of Malgrat de Mar — one that is 100% renewable, fair, distributed, and efficient. It is a community-led initiative that places energy in the hands of the people, based on active citizen participation and transparency.

> **NOTE**: this is a work in progress project in it's initial state. The stack is prepared to support many features in the future, but currently only few are implemented.

## Tech Stack

The prject was bootstrapped with `create-t3-app` tool which help creating the basic structure and configuration files. Refer to [T3 Stack](https://create.t3.gg/) website or check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app).

This project uses the following technologies, please refer to the respective docs.

- [Next.js](https://nextjs.org) - react web app framework
- [Drizzle](https://orm.drizzle.team) - orm
- [Tailwind CSS](https://tailwindcss.com) - style framework
- [Shadcn](https://ui.shadcn.com/) - UI component library
- [Lucide](https://lucide.dev/icons/) - icon library

## Conventional Commit Messages

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

- build
- **chore** / ex: `chore: run tests on travis ci`
- ci
- docs
- **feat** / ex: `feat(blog): add comment section`
- **fix** / ex: `fix(server): send cors headers`
- perf
- refactor
- revert
- style
- test
