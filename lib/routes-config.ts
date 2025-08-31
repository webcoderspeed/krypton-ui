export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

const v1_0_0_ROUTES: EachRoute[] = [
  {
    "title": "Components",
    "href": "/components",
    "noLink": true,
    "items": [
      {
        "title": "Accordion",
        "href": "/components/accordion"
      },
      {
        "title": "Avatar",
        "href": "/components/avatar"
      },
      {
        "title": "Breadcrumb",
        "href": "/components/breadcrumb"
      },
      {
        "title": "Button",
        "href": "/components/button"
      },
      {
        "title": "Collapsible",
        "href": "/components/collapsible"
      },
      {
        "title": "Dialog",
        "href": "/components/dialog"
      },
      {
        "title": "Dropdown Menu",
        "href": "/components/dropdown-menu"
      },
      {
        "title": "Input",
        "href": "/components/input"
      },
      {
        "title": "Scroll Area",
        "href": "/components/scroll-area"
      },
      {
        "title": "Select",
        "href": "/components/select"
      },
      {
        "title": "Sheet",
        "href": "/components/sheet"
      },
      {
        "title": "Stepper",
        "href": "/components/stepper"
      },
      {
        "title": "Table",
        "href": "/components/table"
      },
      {
        "title": "Tabs",
        "href": "/components/tabs"
      }
    ]
  },
  {
    "title": "Getting Started",
    "href": "/getting-started",
    "noLink": true,
    "items": [
      {
        "title": "Installation",
        "href": "/getting-started/installation",
        "noLink": true,
        "items": [
          {
            "title": "React",
            "href": "/getting-started/installation/react"
          }
        ]
      },
      {
        "title": "Introduction",
        "href": "/getting-started/introduction"
      },
      {
        "title": "Quick Start Guide",
        "href": "/getting-started/quick-start-guide"
      }
    ]
  }
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    ans.push(...getRecurrsiveAllLinks(subNode));
  });
  return ans;
}

export function getRoutesFlatten(v: Version) {
  const routes = getRoutesForVersion(v);
  return routes.map((it) => getRecurrsiveAllLinks(it)).flat();
}

export function getRoutesForVersion(v: Version) {
  switch (v) {
    case "v1.0.0":
      return v1_0_0_ROUTES;
    default:
      return v1_0_0_ROUTES;
  }
}

export function getPreviousNext(path: string, v: Version) {
  path = path.split("/").slice(1).join("/");
  const routes = getRoutesFlatten(v);
  const index = routes.findIndex(({ href }) => href == `/${path}`);
  return {
    prev: routes[index - 1],
    next: routes[index + 1],
  };
}

export const availableVersions = ["v1.0.0"] as const;
export type Version = (typeof availableVersions)[number];
