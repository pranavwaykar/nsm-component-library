import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Card from '../components/Card/Card';

export default {
  title: 'Side Drawer Component',
  component: SideDrawer,
  parameters: { layout: 'centered' },
};

export const Basic = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div style={{ height: 400, width: 600, position: 'relative', border: '1px dashed #e6ebf2' }}>
      <button onClick={() => setOpened(true)}>Open Drawer</button>
      <SideDrawer opened={opened} onClose={() => setOpened(false)} title="Details">
        <Card title="Section" padding={12}>
          <div>Any content can go here. Use this as a shell for detail panels.</div>
        </Card>
      </SideDrawer>
    </div>
  );
};


