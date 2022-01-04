import JoditEditor from "jodit-react";
import { useRef } from "react";

export default function Editor({ setPostText }) {
  const editor = useRef(null);

  return (
    <div>
      <JoditEditor
        ref={editor}
        tabIndex={1} // tabIndex of textarea
        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(content) => {
          setPostText(content);
        }}
      />
    </div>
  );
}
