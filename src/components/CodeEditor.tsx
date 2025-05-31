
interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  theme: 'dark' | 'light';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  cssCode,
  onHtmlChange,
  onCssChange,
  theme
}) => {
  const baseTextareaClasses = `
    w-full h-full resize-none border-0 outline-none font-mono text-sm
    leading-relaxed p-4 min-h-0
  `;

  const textareaClasses = theme === 'dark' 
    ? `${baseTextareaClasses} bg-gray-900 text-gray-100 placeholder-gray-500`
    : `${baseTextareaClasses} bg-white text-gray-900 placeholder-gray-400`;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col">
        <div className={`px-4 py-2 text-sm font-medium ${
          theme === 'dark' 
            ? 'bg-gray-800 text-gray-300 border border-gray-700' 
            : 'bg-gray-100 text-gray-700 border border-gray-200'
        } rounded-t-lg border-b-0`}>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            HTML Editor
            <span className="text-xs opacity-60 ml-auto">
              Tab for indentation • Ctrl+A to select all
            </span>
          </span>
        </div>
        <div className={`flex-1 overflow-hidden ${
          theme === 'dark' 
            ? 'border border-gray-700 border-t-0' 
            : 'border border-gray-200 border-t-0'
        } rounded-b-lg`}>
          <textarea
            value={htmlCode}
            onChange={(e) => onHtmlChange(e.target.value)}
            className={textareaClasses}
            placeholder="<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Your Website</title>
</head>
<body>
    <!-- Start writing your HTML here -->
    
</body>
</html>"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            style={{ 
              fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
              tabSize: 2
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const value = e.currentTarget.value;
                const newValue = value.substring(0, start) + '  ' + value.substring(end);
                onHtmlChange(newValue);
                setTimeout(() => {
                  e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                }, 0);
              }
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`px-4 py-2 text-sm font-medium ${
          theme === 'dark' 
            ? 'bg-gray-800 text-gray-300 border border-gray-700' 
            : 'bg-gray-100 text-gray-700 border border-gray-200'
        } rounded-t-lg border-b-0`}>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            CSS Editor
            <span className="text-xs opacity-60 ml-auto">
              Tab for indentation • Bracket matching
            </span>
          </span>
        </div>
        <div className={`flex-1 overflow-hidden ${
          theme === 'dark' 
            ? 'border border-gray-700 border-t-0' 
            : 'border border-gray-200 border-t-0'
        } rounded-b-lg`}>
          <textarea
            value={cssCode}
            onChange={(e) => onCssChange(e.target.value)}
            className={textareaClasses}
            placeholder="/* Start writing your CSS here */

body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

/* Add your styles below */"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            style={{ 
              fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
              tabSize: 2
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const value = e.currentTarget.value;
                const newValue = value.substring(0, start) + '  ' + value.substring(end);
                onCssChange(newValue);
                setTimeout(() => {
                  e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                }, 0);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
