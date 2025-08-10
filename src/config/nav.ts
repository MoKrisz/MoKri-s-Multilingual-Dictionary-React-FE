export interface SubMenuItem {
  labelKey: string;
  path: string;
}

export interface MenuItem {
  labelKey: string;
  height: number;
  path?: string;
  subItems?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    labelKey: "menu.word.base",
    height: 40,
    subItems: [
      { labelKey: "menu.word.list", path: "/words" },
      { labelKey: "menu.word.create", path: "/words/new" },
    ],
  },
  {
    labelKey: "menu.translationGroups.base",
    height: 60,
    subItems: [
      { labelKey: "menu.translationGroups.list", path: "/translation-groups" },
      {
        labelKey: "menu.translationGroups.create",
        path: "/translation-groups/new",
      },
    ],
  },
  { labelKey: "menu.translation", path: "/translation", height: 0 },
  {
    labelKey: "menu.practice.base",
    height: 40,
    subItems: [
      {
        labelKey: "menu.practice.articleGuess",
        path: "practice/guess-the-article",
      },
    ],
  },
];
