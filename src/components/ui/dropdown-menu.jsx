import { useState } from "react";

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  );
}

export function DropdownMenuTrigger({ children, asChild }) {
  const Component = asChild ? 'div' : 'button';
  return (
    <Component onClick={(e) => {
      e.stopPropagation();
      const menu = e.currentTarget.nextElementSibling;
      if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      }
    }}>
      {children}
    </Component>
  );
}

export function DropdownMenuContent({ children, align = "start" }) {
  return (
    <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
      align === "end" ? "right-0" : "left-0"
    }`} style={{ display: 'none' }}>
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      role="menuitem"
      onClick={onClick}
    >
      {children}
    </button>
  );
}