import React from "react";
import Card from "../../Common/Card";
import { Edit, ExternalLink } from "lucide-react";

const BioSection = ({ bio, website }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Me</h3>
        <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center gap-1">
          <Edit size={14} />
          Edit
        </button>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        "{bio}"
      </p>
      
      <div className="flex items-center gap-2">
        <a
          href={website}
          className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {website}
          <ExternalLink size={14} />
        </a>
      </div>
    </Card>
  );
};

export default BioSection;