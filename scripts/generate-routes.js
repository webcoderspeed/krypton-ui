const fs = require('fs');
const path = require('path');

// Function to convert directory name to title
function dirNameToTitle(dirName) {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to scan directory and generate routes
function generateRoutesFromDirectory(basePath, version) {
  const versionPath = path.join(basePath, version);
  
  if (!fs.existsSync(versionPath)) {
    console.warn(`Version directory ${version} does not exist`);
    return [];
  }

  function scanDirectory(dirPath, parentHref = '') {
    const routes = [];
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // Filter only directories
    const directories = items.filter(item => item.isDirectory());
    
    directories.forEach(dir => {
      const dirName = dir.name;
      const fullPath = path.join(dirPath, dirName);
      const href = `${parentHref}/${dirName}`;
      
      // Check if this directory has an index.mdx file
      const hasIndexFile = fs.existsSync(path.join(fullPath, 'index.mdx'));
      
      // Check if this directory has subdirectories
      const subdirs = fs.readdirSync(fullPath, { withFileTypes: true })
        .filter(item => item.isDirectory());
      
      const route = {
        title: dirNameToTitle(dirName),
        href: href
      };
      
      // If there are subdirectories, mark as noLink and add items
      if (subdirs.length > 0) {
        route.noLink = true;
        route.items = scanDirectory(fullPath, href);
      }
      
      routes.push(route);
    });
    
    return routes;
  }
  
  return scanDirectory(versionPath);
}

// Function to generate the routes config file
function generateRoutesConfig() {
  const docsPath = path.join(__dirname, '..', 'contents', 'docs');
  const outputPath = path.join(__dirname, '..', 'lib', 'routes-config.ts');
  
  // Get available versions
  const versions = fs.readdirSync(docsPath, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .sort();
  
  console.log('Found versions:', versions);
  
  // Generate routes for each version
  const versionRoutes = {};
  versions.forEach(version => {
    versionRoutes[version] = generateRoutesFromDirectory(docsPath, version);
  });
  
  // Generate TypeScript content
  const tsContent = `export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

${versions.map(version => {
  const routesVarName = version.replace(/\./g, '_') + '_ROUTES';
  return `const ${routesVarName}: EachRoute[] = ${JSON.stringify(versionRoutes[version], null, 2)};`;
}).join('\n\n')}

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: subNode.href };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export function getRoutesFlatten(v: Version) {
  const routes = getRoutesForVersion(v);
  return routes.map((it) => getRecurrsiveAllLinks(it)).flat();
}

export function getRoutesForVersion(v: Version) {
  switch (v) {
${versions.map(version => {
  const routesVarName = version.replace(/\./g, '_') + '_ROUTES';
  return `    case "${version}":
      return ${routesVarName};`;
}).join('\n')}
    default:
      return ${versions[0] ? versions[0].replace(/\./g, '_') + '_ROUTES' : '[]'};
  }
}

export function getPreviousNext(path: string, v: Version) {
  path = path.split("/").slice(1).join("/");
  const routes = getRoutesFlatten(v);
  const index = routes.findIndex(({ href }) => href == \`/\${path}\`);
  return {
    prev: routes[index - 1],
    next: routes[index + 1],
  };
}

export const availableVersions = [${versions.map(v => `"${v}"`).join(', ')}] as const;
export type Version = (typeof availableVersions)[number];
`;
  
  // Write the generated content to file
  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(`Routes config generated successfully at ${outputPath}`);
  console.log(`Generated routes for versions: ${versions.join(', ')}`);
}

// Run the script
if (require.main === module) {
  try {
    generateRoutesConfig();
  } catch (error) {
    console.error('Error generating routes:', error);
    process.exit(1);
  }
}

module.exports = { generateRoutesConfig };