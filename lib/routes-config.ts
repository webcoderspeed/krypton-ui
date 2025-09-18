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
        "title": "Alert",
        "href": "/components/alert"
      },
      {
        "title": "Alert Dialog",
        "href": "/components/alert-dialog"
      },
      {
        "title": "Aspect Ratio",
        "href": "/components/aspect-ratio"
      },
      {
        "title": "Avatar",
        "href": "/components/avatar"
      },
      {
        "title": "Badge",
        "href": "/components/badge"
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
        "title": "Calendar",
        "href": "/components/calendar"
      },
      {
        "title": "Card",
        "href": "/components/card"
      },
      {
        "title": "Carousel",
        "href": "/components/carousel"
      },
      {
        "title": "Checkbox",
        "href": "/components/checkbox"
      },
      {
        "title": "Collapsible",
        "href": "/components/collapsible"
      },
      {
        "title": "Command",
        "href": "/components/command"
      },
      {
        "title": "Context Menu",
        "href": "/components/context-menu"
      },
      {
        "title": "Dialog",
        "href": "/components/dialog"
      },
      {
        "title": "Drawer",
        "href": "/components/drawer"
      },
      {
        "title": "Dropdown Menu",
        "href": "/components/dropdown-menu"
      },
      {
        "title": "Form",
        "href": "/components/form"
      },
      {
        "title": "Hover Card",
        "href": "/components/hover-card"
      },
      {
        "title": "Input",
        "href": "/components/input"
      },
      {
        "title": "Popover",
        "href": "/components/popover"
      },
      {
        "title": "Progress",
        "href": "/components/progress"
      },
      {
        "title": "Radio Group",
        "href": "/components/radio-group"
      },
      {
        "title": "Select",
        "href": "/components/select"
      },
      {
        "title": "Slider",
        "href": "/components/slider"
      },
      {
        "title": "Stepper",
        "href": "/components/stepper"
      },
      {
        "title": "Switch",
        "href": "/components/switch"
      },
      {
        "title": "Tabs",
        "href": "/components/tabs"
      },
      {
        "title": "Toggle",
        "href": "/components/toggle"
      },
      {
        "title": "Tooltip",
        "href": "/components/tooltip"
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
