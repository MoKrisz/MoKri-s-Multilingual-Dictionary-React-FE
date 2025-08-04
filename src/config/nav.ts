export interface SubMenuItem {
  label: string;
  path: string;
}

export interface MenuItem {
  label: string;
  height: number;
  path?: string;
  subItems?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    label: "Words",
    height: 40,
    subItems: [
      { label: "Word List", path: "/words" },
      { label: "Create Word", path: "/words/new" },
    ],
  },
  {
    label: "Translation Groups",
    height: 60,
    subItems: [
      { label: "Translation Group List", path: "/translation-groups" },
      { label: "Create Translation Group", path: "/translation-groups/new" },
    ],
  },
  { label: "Manage Translations", path: "/translation", height: 0 },
  {
    label: "Practice",
    height: 40,
    subItems: [
      { label: "Guess the Article", path: "practice/guess-the-article" },
    ],
  },
];
