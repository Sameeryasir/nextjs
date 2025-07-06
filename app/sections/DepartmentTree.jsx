"use client";
import React, { useState, useEffect } from "react";
import { Folder as FolderIcon, FolderOpen, FileText } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

// DepartmentTree component (recursive)
const DepartmentTree = ({ node, onSelectNode, isRoot = false }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);
  const [errorChildren, setErrorChildren] = useState(null);

  // 'state: "closed"' indicates it has children that need to be fetched
  const hasChildren = node.state === "closed";

  const handleNodeClick = async () => {
    // If it's a "closed" node and not currently open, fetch children
    if (hasChildren && !isOpen) {
      console.log(`DepartmentTree: Fetching children for node ID: ${node.id}`);
      setIsLoadingChildren(true);
      setErrorChildren(null);

      const formData = new URLSearchParams();
      formData.append("ACTION", "2"); // Action to get children nodes
      // Send the ID of the clicked node to get its children
      formData.append("id", node.id); 

      try {
        const data = await apiFetcher("/api/utility-exchange", "POST", formData, router); // Use utility-exchange endpoint
        setChildren(data || []); // API returns an array directly
        setIsOpen(true); // Open folder on successful fetch
        console.log(`DepartmentTree: Children fetched for ${node.text}:`, data);
      } catch (err) {
        console.error(`DepartmentTree: Error fetching children for ${node.text}:`, err);
        setErrorChildren("Failed to load children departments.");
        setChildren([]);
        setIsOpen(false); // Keep closed if error
      } finally {
        setIsLoadingChildren(false);
      }
    } else {
      // If it's open, just close it (collapse)
      setIsOpen(!isOpen);
      // If it's a leaf node (no children), just toggle the open state
      // and still call onSelectNode for details if needed.
    }

    // Always select the node when clicked, propagating up to the parent Page component
    onSelectNode(node);
  };

  return (
    <div className={`ml-2 ${isRoot ? 'ml-0' : ''}`}> {/* No left margin for root */}
      <div
        className={`cursor-pointer flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
          isOpen ? "font-medium text-gray-900" : "text-gray-700"
        }`}
        onClick={handleNodeClick}
      >
        {isLoadingChildren ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-400 mr-2"></div>
        ) : hasChildren ? (
          isOpen ? (
            <FolderOpen size={18} className="mr-2 text-orange-500" />
          ) : (
            <FolderIcon size={18} className="mr-2 text-gray-500" />
          )
        ) : (
          <FileText size={18} className="mr-2 text-blue-500" /> // Leaf node icon
        )}
        <span className="text-sm">{node.text}</span>
      </div>

      {errorChildren && (
        <div className="text-red-500 text-xs ml-8">Error: {errorChildren}</div>
      )}

      {isOpen && children.length > 0 && (
        <div className="ml-4 transition-all duration-200 ease-in-out">
          {children.map((childNode) => (
            <DepartmentTree
              key={childNode.id}
              node={childNode}
              onSelectNode={onSelectNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentTree;
