import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { deletePostApi } from "../../Api/posts/deletePost.api";
import { ClipLoader } from "react-spinners";

export default function DropDownActionsPost({ postId, callback }) {
  const [loading, setLoading] = useState(false);

  async function deletePost(postId) {
    try {
      setLoading(true);
      const res = await deletePostApi(postId);
      if (res.message) {
        await callback(); 
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative inline-block text-left">
      <Dropdown>
        <DropdownTrigger>
          <button className="p-1 hover:bg-gray-200 rounded-full transition relative flex items-center justify-center">
            {loading ? (
              <ClipLoader color="#2563EB" size={24} className="-translate-x-1" />
            ) : (
              <svg
                className="w-6 h-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            )}
          </button>
        </DropdownTrigger>

        <DropdownMenu
          className="bg-white shadow-lg rounded-lg mt-1 min-w-[120px] border border-gray-200 flex flex-col"
          aria-label="Actions"
        >
          <DropdownItem
            key="delete"
            className="px-3 py-2 hover:bg-red-100 rounded-xl cursor-pointer text-red-600 text-center"
            onClick={() => deletePost(postId)}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
