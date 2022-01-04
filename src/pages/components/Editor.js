import JoditEditor from "jodit-react";
import { useRef } from "react";
import "../../App.css";

export default function Editor({ setPostText }) {
  const editor = useRef(null);
  const config = {
    controls: {
      font: {
        list: {
          "Roboto Medium,Arial,sans-serif": "Roboto",
          "charter, Georgia, Cambria, Times new Roman ,Times, serif": "charter",
        },
      },
    },
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onChange={(content) => {
          setPostText(content);
        }}
      />
    </div>
  );
}
