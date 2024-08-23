import React from 'react'
import { FormElements } from './FormElement'
import SidebarBtnElementDragOverlay from './SidebarBtnElement'

function DesignerSidebar() {
  return (
    <div >
    <aside className='w-[400px] max-w-[400px] flex flex-col
    flex-grow gap-2 border-muted p-4 bg-background overflow-y-auto h-full'>
    Elements
    <SidebarBtnElementDragOverlay formElement= {FormElements.TextField} />
    </aside>
    </div>
  )
}

export default DesignerSidebar
