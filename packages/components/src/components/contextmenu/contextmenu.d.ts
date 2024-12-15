/**
 * 右键
 */

export interface IContextMenuItem {
  label: string;
  value: string;
  visible?: boolean;
}

export interface IContextMenuProps {
  key: string;
  menu: IContextMenuItem;
  range?: Range | null;
}

export interface IContextMenuOptions {
  menuList: IContextMenuItem[];
  onSelect: (options: IContextMenuProps) => void;
}
