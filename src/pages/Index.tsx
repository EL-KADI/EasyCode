import { useState, useCallback } from "react";
import CodeEditor from "../components/CodeEditor";
import PreviewPanel from "../components/PreviewPanel";
import Toolbar from "../components/Toolbar";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyCode</title>
    <meta name="description" content="Create beautiful websites with our advanced HTML & CSS editor">
</head>
<body>
    <header class="hero-section">
        <nav class="navbar ">
            <div class="nav-container ">
                <h1 class="logo">EasyCode</h1>
                <ul class="nav-menu ">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
        
        <div class="hero-content">
            <h1 class="hero-title">Build Amazing Websites</h1>
            <p class="hero-subtitle">Professional HTML & CSS Editor with Live Preview</p>
            <div class="hero-buttons">
                <button class="btn btn-primary">Get Started</button>
                <button class="btn btn-secondary">Learn More</button>
            </div>
        </div>
    </header>

    <main class="main-content">
        <section id="features" class="features-section">
            <div class="container">
                <h2 class="section-title">Powerful Features</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Live Preview</h3>
                        <p>See your changes instantly as you type</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🎨</div>
                        <h3>Syntax Highlighting</h3>
                        <p>Beautiful code highlighting and auto-completion</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>Responsive Design</h3>
                        <p>Mobile-first approach for all screen sizes</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💾</div>
                        <h3>Export Options</h3>
                        <p>Download as HTML, PDF, or image files</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container">
                <h2>Ready to Start Building?</h2>
                <p>Start editing this template or create something completely new!</p>
                <button class="btn btn-primary">Start Coding Now</button>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 EasyCode. Built with passion for web development.</p>
        </div>
    </footer>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Modern CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Custom Properties (CSS Variables) */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-color: #333;
    --light-text: #666;
    --white: #ffffff;
    --light-gray: #f8f9fa;
    --border-radius: 12px;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}


body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}


.navbar {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: var(--transition);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 20px;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--white);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: var(--white);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    position: relative;
}

.nav-menu a:hover {
    transform: translateY(-2px);
}

.nav-menu a:before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
}

.nav-menu a:hover:before {
    width: 100%;
}

/* Hero Section */
.hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, var(--primary-color) 50%, var(--secondary-color) 100%);
    position: relative;
    overflow: hidden;
}

.hero-section:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 0.8s ease 0.4s both;
}

/* Buttons */
.btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    display: inline-block;
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: linear-gradient(45deg, var(--accent-color), #f093fb);
    color: var(--white);
    box-shadow: var(--shadow);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(240, 147, 251, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--white);
    border: 2px solid var(--white);
}

.btn-secondary:hover {
    background: var(--white);
    color: var(--primary-color);
    transform: translateY(-3px);
}

/* Main Content */
.main-content {
    background: var(--white);
    position: relative;
    z-index: 1;
}

/* Features Section */
.features-section {
    padding: 5rem 0;
    background: var(--white);
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
    position: relative;
}

.section-title:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border-radius: 2px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid rgba(102, 126, 234, 0.1);
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
}

.feature-card p {
    color: var(--light-text);
    line-height: 1.6;
}

/* CTA Section */
.cta-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 5rem 0;
    text-align: center;
    color: var(--white);
}

.cta-section h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
}

.cta-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

/* Footer */
.footer {
    background: #2c3e50;
    color: var(--white);
    text-align: center;
    padding: 2rem 0;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        gap: 1rem;
    }
    
    .nav-menu a {
        font-size: 0.9rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .feature-card {
        padding: 2rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .nav-container {
        padding: 1rem 15px;
    }
    
    .nav-menu {
        gap: 0.5rem;
    }
    
    .hero-content {
        padding: 0 15px;
    }
}

/* Print Styles */
@media print {
    .navbar,
    .hero-buttons,
    .btn {
        display: none;
    }
    
    body {
        background: white;
        color: black;
    }
    
    .hero-section {
        background: white;
        color: black;
        min-height: auto;
        padding: 2rem 0;
    }
}`);

  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">(
    "split"
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleClearCode = useCallback(() => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Project</title>
</head>
<body>
    <h1>Welcome to EasyCode!</h1>
    <p>Start building your amazing website here.</p>
    <div class="container">
        <p>This is your blank canvas. Let your creativity flow!</p>
    </div>
</body>
</html>`);
    setCssCode(`/* Your custom styles */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
    color: #333;
}

h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

p {
    margin-bottom: 15px;
    line-height: 1.6;
}

/* Add your styles below */`);
    toast({
      title: "Code Cleared",
      description: "Editor has been reset with a clean template.",
    });
  }, []);

  const handleSaveToLocal = useCallback(() => {
    const data = {
      html: htmlCode,
      css: cssCode,
      timestamp: new Date().toISOString(),
      version: "2.0",
    };
    localStorage.setItem("easycode-project", JSON.stringify(data));
    toast({
      title: "Project Saved",
      description: "Your project has been saved to local storage.",
    });
  }, [htmlCode, cssCode]);

  const handleLoadFromLocal = useCallback(() => {
    const saved = localStorage.getItem("easycode-project");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHtmlCode(data.html || htmlCode);
        setCssCode(data.css || cssCode);
        toast({
          title: "Project Loaded",
          description: "Your saved project has been loaded successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to load saved project. The file may be corrupted.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No Saved Project",
        description: "No saved project found in local storage.",
        variant: "destructive",
      });
    }
  }, [htmlCode, cssCode]);

  return (
    <div
      className={`lg:min-h-screen h-[222vh] lg:h-full ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b transition-colors duration-300 sticky top-0 z-50 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex  items-center justify-between h-16">
            <div className="flex items-center flex-col gap-2 sm:flex-row sm:gap-0 sm:space-x-3">
              <div className="sm:w-8 sm:h-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs ">EC</span>
              </div>
              <div>
                <h1
                  className={`sm:text-xl font-bold text-xs  ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  EasyCode
                </h1>
                <p
                  className={`text-xs hidden sm:block ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Professional Web Editor
                </p>
              </div>
            </div>

            <Toolbar
              onClear={handleClearCode}
              onSave={handleSaveToLocal}
              onLoad={handleLoadFromLocal}
              onViewModeChange={setViewMode}
              onThemeChange={setTheme}
              viewMode={viewMode}
              theme={theme}
              htmlCode={htmlCode}
              cssCode={cssCode}
            />
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto px-4 py-4 h-[calc(100vh-80px)] ">
        <div className="flex flex-col lg:w-full   lg:flex-row gap-4 lg:h-full ">
          {(viewMode === "split" || viewMode === "editor") && (
            <div
              className={`${
                viewMode === "split" ? "w-1/2" : "lg:w-full"
              } flex flex-col gap-4  w-full h-[100vh] lg:h-full`}
            >
              <CodeEditor
                htmlCode={htmlCode}
                cssCode={cssCode}
                onHtmlChange={setHtmlCode}
                onCssChange={setCssCode}
                theme={theme}
              />
            </div>
          )}

          {(viewMode === "split" || viewMode === "preview") && (
            <div className={`${viewMode === "split" ? "w-1/2" : "lg:w-full"} w-full h-[100vh] lg:h-full pb-5 `}>
              <PreviewPanel
                htmlCode={htmlCode}
                cssCode={cssCode}
                theme={theme}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
