import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

function RichTextEditor() {
  const [editorHtml, setEditorHtml] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [storedContent, setStoredContent] = useState('');

  const handleBoldClick = () => {
    toggleFormatting('<strong>', '</strong>', 'isBold');
  };

  const handleItalicClick = () => {
    toggleFormatting('<em>', '</em>', 'isItalic');
  };

  const handleHyperlinkClick = () => {
    const url = prompt('Enter the URL for the hyperlink:');
    if (url) {
      applyFormatting('<a href="' + url + '">', '</a>');
    }
  };

  const toggleFormatting = (startTag, endTag, stateVariable) => {
    if (!selectedText) return;

    const isCurrentlyFormatted = stateVariable === 'isBold' ? isBold : isItalic;

    if (isCurrentlyFormatted) {
      // Remove formatting
      const updatedHtml = editorHtml
        .replace(new RegExp(startTag, 'g'), '')
        .replace(new RegExp(endTag, 'g'), '');
      setEditorHtml(updatedHtml);
    } else {
      // Apply formatting
      const updatedHtml = editorHtml.replace(
        selectedText,
        startTag + selectedText + endTag
      );
      setEditorHtml(updatedHtml);
    }

    stateVariable === 'isBold' ? setIsBold(!isBold) : setIsItalic(!isItalic);
  };

  const handleSelectionChange = (range, source, editor) => {
    if (range) {
      const selected = editor.getText(range.index, range.length);
      setSelectedText(selected);
    }
  };

  const handleStoreClick = () => {
    console.log('Storing content:', editorHtml);
    setStoredContent(editorHtml);
  };

  return (
    <div>
      <div>
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
        <button onClick={handleHyperlinkClick}>Hyperlink</button>
        <button onClick={handleStoreClick}>Store Content</button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '8px' }}>
        <ReactQuill
          value={editorHtml}
          onChange={setEditorHtml}
          modules={{
            toolbar: false,
            clipboard: {
              matchVisual: false, // Disable pasting with formatting
            },
          }}
          onChangeSelection={handleSelectionChange}
        />
      </div>
      <div>
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }}></div>
      </div>
      <div>
        <h2>Stored Content:</h2>
        <pre>{storedContent}</pre>
      </div>
    </div>
  );
}

export default RichTextEditor;
