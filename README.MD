# ityhad-project

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>
<br/>

This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## Getting Started

A React Framework for building internal tools, admin panels, dashboards & B2B apps with unmatched flexibility ✨

Refine's hooks and components simplifies the development process and eliminates the repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Hasura Configuration
NEXT_PUBLIC_HASURA_API_URL=your_hasura_api_url
NEXT_PUBLIC_HASURA_ADMIN_SECRET=your_hasura_admin_secret
```

For production deployment, make sure to set these environment variables in your hosting platform.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Docker Deployment

To build and run the Docker container:

```bash
# Build the image
docker build \
  --build-arg NEXT_PUBLIC_HASURA_API_URL=your_hasura_api_url \
  --build-arg NEXT_PUBLIC_HASURA_ADMIN_SECRET=your_hasura_admin_secret \
  -t ityhad-app .

# Run the container
docker run -p 3000:3000 ityhad-app
```

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **Hasura Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

## License

MIT
