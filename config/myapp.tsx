"use client";

import React from 'react';
import useRefreshToken from '@/lib/useRefreshToken'; // Adjust the path according to your project structure

const RefreshTokenProvider = ({ children }: { children: React.ReactNode }) => {
  useRefreshToken();

  return <>{children}</>;
};

export default RefreshTokenProvider;
