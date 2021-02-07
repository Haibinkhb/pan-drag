import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

export default {
  component: Menu,
  subcomponents: { MenuItem },
  title: "Menu",
  argTypes: {},
} as Meta;

export const Default: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>Tab 1</MenuItem>
    <MenuItem>Tab 2</MenuItem>
    <SubMenu title="Tab 3">
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem>3</MenuItem>
    </SubMenu>
    <MenuItem disabled>Tab 4</MenuItem>
  </Menu>
);
