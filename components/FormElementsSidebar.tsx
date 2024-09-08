import React from 'react'
import { FormElements } from './FormElement'
import SidebarBtnElement from './SidebarBtnElement'

function FormElementsSidebar() {
  return (
    <div>
        Elements
        <SidebarBtnElement formElement= {FormElements.TextField} />
    </div>
  )
}

export default FormElementsSidebar
