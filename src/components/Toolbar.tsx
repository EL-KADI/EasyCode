
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  Download,
  FileImage,
  FileText,
  Trash2,
  Save,
  FolderOpen,
  Monitor,
  Smartphone,
  Code,
  Sun,
  Moon,
  Eye
} from 'lucide-react';
import { exportAsImage, exportAsPDF } from './ExportUtils';

interface ToolbarProps {
  onClear: () => void;
  onSave: () => void;
  onLoad: () => void;
  onViewModeChange: (mode: 'split' | 'editor' | 'preview') => void;
  onThemeChange: (theme: 'dark' | 'light') => void;
  viewMode: 'split' | 'editor' | 'preview';
  theme: 'dark' | 'light';
  htmlCode: string;
  cssCode: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onClear,
  onSave,
  onLoad,
  onViewModeChange,
  onThemeChange,
  viewMode,
  theme,
  htmlCode,
  cssCode
}) => {
  const handleExportImage = async () => {
    if (viewMode === 'editor') {
      toast({
        title: "Preview Required",
        description: "Please make sure the preview is visible to export image.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Exporting Image",
        description: "Generating image preview...",
      });
      
      await exportAsImage(htmlCode, cssCode);
      
      toast({
        title: "Image Exported",
        description: "Your website has been saved as an image.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export image.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = async () => {
    if (viewMode === 'editor') {
      toast({
        title: "Preview Required",
        description: "Please make sure the preview is visible to export PDF.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Exporting PDF",
        description: "Generating PDF document...",
      });
      
      await exportAsPDF(htmlCode, cssCode);
      
      toast({
        title: "PDF Exported",
        description: "Your website has been saved as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export PDF.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadHTML = () => {
    const fullHTML = htmlCode.includes('<!DOCTYPE') ? 
      (htmlCode.includes('</head>') ? 
        htmlCode.replace('</head>', `<style>\n${cssCode}\n</style>\n</head>`) :
        htmlCode.replace('<head>', `<head>\n<style>\n${cssCode}\n</style>`)) :
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyCode</title>
    <style>
${cssCode}
    </style>
</head>
<body>
${htmlCode}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website.html';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML Downloaded",
      description: "Your website has been saved as an HTML file.",
    });
  };

  return (
    <div className="flex items-center lg:space-x-2 flex-col lg:flex-row gap-5 lg:gap-0:">
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSave}
          className="h-8 px-2"
        >
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLoad}
          className="h-8 px-2"
        >
          <FolderOpen className="w-4 h-4 mr-1" />
          Load
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-8 px-2 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 hidden lg:block" />

      <div className="flex lg:flex-wrap xl:flex-nowrap items-center space-x-1 -mt-5 lg:-mt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownloadHTML}
          className="h-8 px-2"
        >
          <Download className="w-4 h-4 mr-1" />
          HTML
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExportImage}
          className="h-8 px-2"
        >
          <FileImage className="w-4 h-4 mr-1" />
          Image
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExportPDF}
          className="h-8 px-2"
        >
          <FileText className="w-4 h-4 mr-1" />
          PDF
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 hidden lg:block" />

      <div className="flex items-center space-x-1">
        <Button
          variant={viewMode === 'split' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('split')}
          className="h-8 px-2  hidden lg:flex"
        >
          <Monitor className="w-4 h-4 mr-1" />
          Split
        </Button>
        <Button
          variant={viewMode === 'editor' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('editor')}
          className="h-8 px-2  hidden lg:flex"
        >
          <Code className="w-4 h-4 mr-1" />
          Editor
        </Button>
        <Button
          variant={viewMode === 'preview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('preview')}
          className="h-8 px-2  hidden lg:flex"
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 hidden lg:block" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        className="h-8 px-2 lg:px-0 xl:px-2 -mt-10 lg:-mt-0"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 mr-1" />
        ) : (
          <Moon className="w-4 h-4 mr-1" />
        )}
        {theme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </div>
  );
};

export default Toolbar;
