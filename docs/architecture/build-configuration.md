# Build Configuration and Dependency Management

## Overview

This document details the build configuration and dependency management strategies implemented in our Next.js application to ensure reliable builds and optimal client-side performance.

## Next.js Configuration

### Webpack Configuration

The application uses custom Webpack configuration in `next.config.js` to handle specific Node.js dependencies that could cause issues in the client bundle:

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    // Ensure fallback object exists
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    // Fallback for 'supports-color' on the client
    config.resolve.fallback['supports-color'] = false;

    // Alias debug directly to false on the client
    config.resolve.alias['debug'] = false;
    
    // Alias https-proxy-agent to false on the client, as it's Node.js specific
    config.resolve.alias['https-proxy-agent'] = false;
  }
  return config;
}
```

### Package Transpilation

Certain CommonJS packages require transpilation to work correctly in our Next.js environment:

```javascript
transpilePackages: ['gaxios', 'https-proxy-agent']
```

### Image Configuration

The application is configured to handle images from specific domains:

```javascript
images: {
  domains: ['d22po4pjz3o32e.cloudfront.net', 'images.unsplash.com'],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.windowworldla.com",
      port: "",
      pathname: "/**",
    },
    // ... other patterns
  ],
  unoptimized: true,
}
```

## Build Process

### Key Build Steps

1. Clean build artifacts:

```powershell
Remove-Item -Recurse -Force .next
```

1. Clean yarn cache:

```bash
yarn cache clean
```

1. Build the application:

```bash
yarn run build
```

### Common Build Issues and Solutions

#### Node.js Module Resolution

Some Node.js-specific modules can cause issues when included in the client bundle:

1. **debug Package**:
   - Issue: The `debug` package attempts to use Node.js-specific features on the client side
   - Solution: Alias `debug` to `false` for client builds

2. **supports-color Package**:
   - Issue: Used by various dependencies but not needed in the browser
   - Solution: Set as `false` in Webpack fallbacks

3. **https-proxy-agent**:
   - Issue: Node.js-specific package that can get pulled into the client bundle
   - Solution: Alias to `false` for client builds and include in `transpilePackages`

## Development Environment

### Required Tools

- Node.js 18.x or higher
- Yarn package manager
- PowerShell (Windows) or Bash (Unix-like systems)

### Development Server

Start the development server using:

```bash
yarn dev
```

### Production Deployment

For production deployment:

1. Ensure all dependencies are installed: `yarn install`
2. Build the application: `yarn build`
3. Start the production server: `yarn start`

## Dependency Management

### Key Dependencies

- Next.js 15.3.1
- React 18.2.0
- TypeScript
- Tailwind CSS
- Relume UI (@relume_io/relume-ui and @relume_io/relume-tailwind)

### Version Control

- Dependencies are locked using yarn.lock
- Package versions are specified in package.json
- Regular security audits are performed using `yarn audit`

## Troubleshooting Guide

### Common Issues

1. **Module Resolution Errors**
   - Clear `.next` directory
   - Clean yarn cache
   - Rebuild the application

2. **ESM/CJS Compatibility**
   - Use `transpilePackages` for problematic CommonJS modules
   - Configure appropriate Webpack aliases for Node.js-specific modules

3. **Image Optimization**
   - Ensure domains are properly configured in `next.config.js`
   - Check remote patterns for external image sources

### Best Practices

1. Always clear build cache when encountering persistent build issues
2. Keep dependencies updated to their latest compatible versions
3. Monitor build output for warnings about package compatibility
4. Document any new build configuration changes in this file
