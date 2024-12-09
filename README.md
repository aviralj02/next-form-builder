## Next Form Builder (Peerlist Assignment)

A simple form builder lets users create customizable forms with various question types and publish them to collect responses.

Live: [https://next-form-builder.vercel.app](https://next-form-builder.vercel.app/)

### 🔧 Tech Stack

- Framework - [Next.js](https://nextjs.org/)
- Styling - [Taiwlind CSS](https://tailwindcss.com/)
- Database - PostgreSQL [(Xata)](https://xata.io/)
- ORM - [Drizzle ORM](https://orm.drizzle.team/)

### Local Setup

```bash
$ git clone https://github.com/aviralj02/next-form-builder.git
$ cd next-form-builder
$ yarn install
```

- Add `.env` credentials like in [.env.example](./.env.example).

```bash
$ yarn dev
```

### Assumptions

- Each option in a `Single Select` question includes a `×` button to delete the specific option.
- Each question includes a remove question button to delete the entire question.
