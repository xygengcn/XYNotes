/**
 * 右键
 */

export interface ContextMenuItem {
  label: string;
  value: string;
}

export interface ContextMenuProps {
  left: number;
  top: number;
  menu: ContextMenuItem[];
  selectText: string;
}

export interface ContextMenuOptions {
  menu: ContextMenuItem[];
  onSelect: (value: string, index: string) => void;
}
