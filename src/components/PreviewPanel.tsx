
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { RefreshCw, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewPanelProps {
  htmlCode: string;
  cssCode: string;
  theme: 'dark' | 'light';
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ htmlCode, cssCode, theme }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const refreshPreview = () => {
    setIsLoading(true);
    setHasError(false);
    updatePreview();
  };

  const updatePreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (document) {
        try {
          let bodyContent = htmlCode;
          let headContent = '';
          let fullDocument = htmlCode;

          const isCompleteDoc = htmlCode.toLowerCase().includes('<!doctype') || 
                               htmlCode.toLowerCase().includes('<html');

          if (isCompleteDoc) {
            if (cssCode.trim()) {
              const styleTag = `<style>\n${cssCode}\n</style>`;
              
              if (htmlCode.includes('</head>')) {
                fullDocument = htmlCode.replace('</head>', `${styleTag}\n</head>`);
              } else if (htmlCode.includes('<head>')) {
                fullDocument = htmlCode.replace('<head>', `<head>\n${styleTag}`);
              } else {
                fullDocument = htmlCode.replace('<html>', `<html>\n<head>\n${styleTag}\n</head>`);
              }
            }
          } else {
            const headMatch = htmlCode.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
            const bodyMatch = htmlCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            
            if (headMatch) {
              headContent = headMatch[1];
            }
            if (bodyMatch) {
              bodyContent = bodyMatch[1];
            } else {
              bodyContent = htmlCode;
            }

            fullDocument = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview</title>
                ${headContent}
                <style>
                  ${cssCode}
                </style>
              </head>
              <body>
                ${bodyContent}
              </body>
              </html>
            `;
          }

          document.open();
          document.write(fullDocument);
          document.close();
          
          setLastUpdate(Date.now());
          setHasError(false);
          
          iframe.onload = () => {
            setIsLoading(false);
            const iframeDoc = iframe.contentDocument;
            if (iframeDoc) {
              iframe.contentWindow?.addEventListener('error', (e) => {
                console.warn('Preview JavaScript error:', e.message);
              });
            }
          };

        } catch (error) {
          console.error('Error updating preview:', error);
          setHasError(true);
          setIsLoading(false);
          
          const errorHTML = `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  padding: 40px 20px; 
                  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                  color: white;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  text-align: center;
                }
                .error-container { 
                  background: rgba(255, 255, 255, 0.1);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  border-radius: 15px; 
                  padding: 30px;
                  max-width: 500px;
                  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                }
                .error-icon {
                  font-size: 3rem;
                  margin-bottom: 20px;
                }
                h3 {
                  margin: 0 0 15px 0;
                  font-size: 1.5rem;
                }
                p {
                  margin: 0;
                  opacity: 0.9;
                  line-height: 1.6;
                }
              </style>
            </head>
            <body>
              <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3>Preview Error</h3>
                <p>There was an error rendering your code. Please check your HTML and CSS syntax for any mistakes.</p>
              </div>
            </body>
            </html>
          `;
          document.open();
          document.write(errorHTML);
          document.close();
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview();
    }, 300);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode]);

  return (
    <div className="h-full flex flex-col">
      <div className={`px-4 py-2 text-sm font-medium flex items-center justify-between ${
        theme === 'dark' 
          ? 'bg-gray-800 text-gray-300 border border-gray-700' 
          : 'bg-gray-100 text-gray-700 border border-gray-200'
      } rounded-t-lg border-b-0`}>
        <span className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${hasError ? 'bg-red-500' : 'bg-green-500'}`}></div>
          Live Preview
          {isLoading && (
            <RefreshCw className="w-3 h-3 animate-spin ml-2" />
          )}
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60">
            Updated: {new Date(lastUpdate).toLocaleTimeString()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            className="h-6 w-6 p-0"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className={`flex-1 ${
        theme === 'dark' 
          ? 'border border-gray-700 border-t-0' 
          : 'border border-gray-200 border-t-0'
      } rounded-b-lg overflow-hidden bg-white`}>
        <iframe
          ref={iframeRef}
          className="w-full h-full bg-white"
          title="Live Preview"
          sandbox="allow-same-origin allow-scripts"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default PreviewPanel;
