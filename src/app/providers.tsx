'use client';

import React from 'react';

import { ThemeProvider } from '#/components/ui/theme-provider';
import { Provider as WorkflowProvider } from '#/state/workflow';

interface Props extends React.PropsWithChildren {}

function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <WorkflowProvider>{children}</WorkflowProvider>
    </ThemeProvider>
  );
}

export default Providers;
