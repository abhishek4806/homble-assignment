import React, { useState } from 'react';

function ExpandableSection({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expandable-section">
      <h3 onClick={() => setIsExpanded(!isExpanded)}>{title}</h3>
      {isExpanded && <div className="section-content">{children}</div>}
    </div>
  );
}

export default ExpandableSection;
