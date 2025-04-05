
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

export function AppLayout() {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  return (
    <div className="flex min-h-screen">
      {showSidebar && <AppSidebar />}
      
      <div className="flex flex-col flex-1">
        {isMobile && (
          <div className="h-14 border-b flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
