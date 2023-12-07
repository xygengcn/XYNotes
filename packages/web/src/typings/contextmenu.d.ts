/**
 * 右键
 */

export interface IContextMenuItem {
  label: string;
  value: string;
}

export interface IContextMenuProps {
  key: string;
  menu: IContextMenuItem;
}

export interface IContextMenuOptions {
  menuList: IContextMenuItem[];
  onSelect: (options: IContextMenuProps) => void;
}
