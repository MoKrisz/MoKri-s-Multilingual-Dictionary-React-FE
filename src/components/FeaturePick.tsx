import React from "react";

interface FeaturePickProps {
  children: React.ReactNode;
}

export default function FeaturePick({ children }: FeaturePickProps) {
  return (
    <p className="h-full flex items-center justify-center rounded-lg border border-black bg-lincolngreen hover:bg-lincolngreenlighter">
      {children}
    </p>
  );
}
