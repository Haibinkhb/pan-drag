import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Icon, IconProps } from "./icon";
export default {
  title: "Icon",
  component: Icon,
  argTypes: {
    icon: {
      defaultValue: "arrow-down",
      description: `基于 react-fontawesome 请前往
      https://fontawesome.com/icons?d=gallery&m=free
      查看可选值`,
      table: {
        type: "string",
      },
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => {
  return <Icon size="2x" {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
};
