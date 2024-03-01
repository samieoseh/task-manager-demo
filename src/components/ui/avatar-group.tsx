import React from "react";

export default function AvatarGroup({
  children,
  max,
}: {
  children: React.ReactNode;
  max?: number;
}) {
  // Convert children to an array to make it easier to work with
  const childrenArray = React.Children.toArray(children);

  // Determine the number of avatars to show and to hide
  const showChildren =
    max && childrenArray.length > max
      ? childrenArray.slice(0, max)
      : childrenArray;
  const hiddenCount =
    max && childrenArray.length > max ? childrenArray.length - max : 0;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {showChildren.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
      {hiddenCount > 0 && (
        <div className="flex items-center justify-center bg-gray-400 text-black h-8 w-8 rounded-full z-10">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}
