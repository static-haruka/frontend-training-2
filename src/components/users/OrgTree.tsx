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
  const hasChildren = Boolean(node.children?.length);
  const isSelected = selectedId === node.id;

  return (
    <div>
      <div
        className="w-full flex items-stretch gap-1 text-sm text-left transition-colors"
        style={{
          paddingLeft: `${16 + depth * 16}px`,
          paddingRight: "16px",
          backgroundColor: isSelected ? "#ebf8ff" : "transparent",
          color: isSelected ? "#4a90d9" : "#2d3748",
        }}
      >
        {hasChildren || depth === 0 ? (
          <button
            type="button"
            onClick={() => {
              if (hasChildren) setOpen((prev) => !prev);
            }}
            aria-label={`${node.name}を${open ? "閉じる" : "開く"}`}
            aria-expanded={hasChildren ? open : undefined}
            disabled={!hasChildren}
            className="flex w-4 flex-shrink-0 items-center justify-center py-2"
            style={{
              color: "#4a90d9",
              cursor: hasChildren ? "pointer" : "default",
            }}
          >
            {open ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronUp size={14} />
            )}
          </button>
        ) : (
          <span style={{ width: "16px", flexShrink: 0 }} />
        )}
        <button
          type="button"
          onClick={() => onSelect(isSelected ? null : node.id)}
          className="min-w-0 flex-1 py-2 text-left whitespace-nowrap"
          style={{
            color: "inherit",
            cursor: "pointer",
          }}
        >
          {node.name}
        </button>
      </div>

      {hasChildren && open && (
        <div>
          {node.children?.map((child) => (
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
