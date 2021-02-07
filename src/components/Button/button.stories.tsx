import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args}>button</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
};

export const Size = Template.bind({});
Size.args = {
  btnType: "danger",
  size: "lg",
};

export const Link = Template.bind({});
Link.args = {
  btnType: "link",
  size: "sm",
};
