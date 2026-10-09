import type { ReactNode } from "react";
const navigation = [
  {label:"Overview",icon:"◫",href:"/"},{label:"Trades",icon:"↗",href:"/trades"},{label:"Journal",icon:"▤",href:"/journal"},
  {label:"Analytics",icon:"⌁",href:"/analytics"},{label:"Imports",icon:"⇧",href:"/imports"},{label:"Settings",icon:"⚙",href:"/settings"}
];
export function AppShell({children,active}:{children:ReactNode;active:string}) {
  return <div className="app-layout">
    <aside className="sidebar"><a href="/" className="brand" aria-label="Vorqexa Journal home"><span className="brand-mark">V</span><span><span className="brand-name">vorqexa</span><span className="brand-sub">journal</span></span></a>
      <p className="nav-label">WORKSPACE</p><nav className="nav-list" aria-label="Main navigation">{navigation.map(item=><a key={item.label} href={item.href} className={`nav-item ${active===item.label?"active":""}`} aria-current={active===item.label?"page":undefined}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</a>)}</nav>
      <div className="sidebar-bottom"><div className="account-chip"><span className="avatar">VJ</span><div><div className="account-label">Personal workspace</div><div className="account-detail">Authentication not connected</div></div></div></div>
    </aside><main className="main-area"><header className="topbar"><span className="breadcrumb">Workspace / {active}</span><div className="topbar-right"><span>Private by design</span><span className="avatar-small">V</span></div></header>{children}</main>
  </div>;
}
