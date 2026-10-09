import {AppShell} from "@/components/layout/app-shell";
export function FeaturePlaceholder({active,title,description,nextStep}:{active:string;title:string;description:string;nextStep:string}){
 return <AppShell active={active}><section className="page-heading"><div><p className="eyebrow">WORKSPACE</p><h1>{title}</h1><p className="muted">{description}</p></div><span className="status-pill"><span className="status-dot"/>Foundation mode</span></section><section className="panel empty-state"><div className="empty-icon" aria-hidden="true">◌</div><h3>This module is scaffolded, not connected yet.</h3><p>{nextStep}</p></section><p className="footnote">No real account data is connected yet.</p></AppShell>;
}
