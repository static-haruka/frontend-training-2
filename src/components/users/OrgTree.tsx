"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { OrgNode } from "@/lib/mockUsers";

type Props = {
  nodes: OrgNode[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  depth?: number;
};

function OrgTreeNode({
  node,
  selectedId,
  onSelect,
  depth = 0,
}: {
  node: OrgNode;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  depth: number;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <button
        onClick={() => {
          onSelect(isSelected ? null : node.id);
          if (hasChildren) setOpen((prev) => !prev);
        }}
        className="w-full flex items-center gap-1 py-2 text-sm text-left transition-colors"
        style={{
          paddingLeft: `${16 + depth * 16}px`,
          paddingRight: "16px",
          backgroundColor: isSelected ? "#ebf8ff" : "transparent",
          color: isSelected ? "#4a90d9" : "#2d3748",
        }}
      >
        {hasChildren || depth === 0 ? (
          open ? (
            <ChevronDown
              size={14}
              className="flex-shrink-0"
              style={{ color: "#4a90d9" }}
            />
          ) : (
            <ChevronUp
              size={14}
              className="flex-shrink-0"
              style={{ color: "#4a90d9" }}
            />
          )
        ) : (
          <span style={{ width: "14px", flexShrink: 0 }} />
        )}
        <span className="whitespace-nowrap">{node.name}</span>
      </button>

      {hasChildren && open && (
        <div>
          {node.children!.map((child) => (
            <OrgTreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgTree({
  nodes,
  selectedId,
  onSelect,
  depth = 0,
}: Props) {
  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      {nodes.map((node) => (
        <OrgTreeNode
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth}
        />
      ))}
    </div>
  );
}
