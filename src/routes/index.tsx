import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { Mail, ExternalLink, ArrowUpRight, Link, UserCircle, Globe } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Project = {
  name: string;
  status?: string;
  description: string;
  tags: string[];
  repo: string;
  showcase?: { type: "video" | "image" | "link"; url: string; label?: string };
};

const ai: Project[] = [
  {
    name: "geoGuessr_assistant",
    status: "Thesis",
    description:
      "Street-level image analysis pipeline for geographic location inference. Combines YOLO object detection, OCR and Overpass / Nominatim queries to triangulate a likely location from a single picture.",
    tags: ["DeepLearning", "computer_vision", "OCR", "3D_Rendering"],
    repo: "https://github.com/yacine204/geoGuessr_assistant",
    showcase: {
      type: "video",
      url: "https://github.com/user-attachments/assets/d70b2dbb-d351-4f3a-bd26-0f363e6a90f6",
    },
  },
  {
    name: "Aiki",
    status: "WIP",
    description:
      "Local Wikipedia retrieval engine built on TF-IDF and cosine similarity. Aims to act as a lightweight, offline-friendly search / RAG backbone for LLM pipelines.",
    tags: ["Search Engine", "RAG", "LLM", "web_scraping"],
    repo: "https://github.com/yacine204/Aiki",
    showcase: {
      type: "video",
      url: "https://github.com/user-attachments/assets/992d43ed-8369-4032-a910-d10c80d528a5",
      label: "Demo · also: live wiki view",
    },
  },
];

const web: Project[] = [
  {
    name: "vdrw",
    status: "WIP",
    description:
      "Real-time collaborative drawing & chatting app powered by Django Channels and WebSockets. Shared canvas, live presence, instant messaging.",
    tags: ["websockets", "django", "real_time"],
    repo: "https://github.com/yacine204/vdrw",
    showcase: { type: "link", url: "https://vdrw.vercel.app/", label: "Live demo" },
  },
];

const lowlevel: Project[] = [
  {
    name: "cit",
    status: "WIP",
    description:
      "My own implementation of git, from scratch in C. Object store, refs, commits — modeled around a rose-tree data structure to mirror git's internals.",
    tags: ["version_control", "git", "rose_tree", "data_structure"],
    repo: "https://github.com/yacine204/cit",
  },
  {
    name: "frg_compiler",
    description:
      "A compiler for the frog language (.frg). Hand-written lexer, syntax and semantic analysis — entirely in C, with a GTK-based UI for inspecting compilation stages.",
    tags: ["compiler", "lexical", "syntax", "semantic"],
    repo: "https://github.com/yacine204/frg_compiler",
  },
];

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-28 sm:pt-32">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const links = [
    { href: "#about", label: "about" },
    { href: "#projects", label: "projects" },
    { href: "#contact", label: "contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 font-mono text-xs">
        <a href="#top" className="text-muted-foreground hover:text-foreground">
          yacine@ubuntu
        </a>
        <nav className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function useTypewriter(text: string, speed = 55, startDelay = 0, active = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    setOut("");
    setDone(false);
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay, active]);
  return { out, done };
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[2px] animate-pulse bg-primary align-middle" />
  );
}

function Hero() {
  const [cycle, setCycle] = useState(0);
  const cmd = useTypewriter("whoami", 75, 350);
  const [phase, setPhase] = useState(1); // 1 typing cmd, 2 line1, 3 line2, 4 done

  useEffect(() => {
    if (cmd.done && phase === 1) {
      const t = setTimeout(() => setPhase(2), 220);
      return () => clearTimeout(t);
    }
  }, [cmd.done, phase]);

  useEffect(() => {
    if (phase === 4) {
      const t = setTimeout(() => setCycle((c) => c + 1), 10000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    setPhase(1);
  }, [cycle]);

  return (
    <section id="top" className="pb-20">
      <div className="overflow-hidden rounded-md border border-border bg-card/60 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]">
        {/* window chrome — linux terminal bar */}
        <div className="flex items-center border-b border-border bg-background/60 px-3 py-2">
          <span className="text-[11px] text-muted-foreground">
            yacine@ubuntu: ~
          </span>
        </div>

        <div key={cycle} className="space-y-3 p-5 text-[14px] leading-relaxed sm:p-6">
          <div>
            <span className="text-primary">yacine@ubuntu</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-foreground/70">~</span>
            <span className="text-muted-foreground">$ </span>
            <span className="text-foreground">{cmd.out}</span>
            {!cmd.done && <Caret />}
          </div>

          {phase >= 2 && (
            <TerminalLine
              delay={1}
              text="yacine benaroussi — computer science persuing my master's, software engineer based in oran, algeria."
              onDone={() => setPhase((p) => Math.max(p, 3))}
            />
          )}
          {phase >= 3 && (
            <TerminalLine
              delay={250}
              text="i turn complex ideas into clean, usable software. focused on ai, full-stack, and low-level systems — i like understanding how things really work under the hood."
              onDone={() => setPhase((p) => Math.max(p, 4))}
              highlight={["ai", "full-stack", "low-level systems"]}
            />
          )}
          {phase >= 4 && (
            <div className="pt-1">
              <span className="text-primary">yacine@ubuntu</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-foreground/70">~</span>
              <span className="text-muted-foreground">$ </span>
              <Caret />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TerminalLine({
  text,
  delay = 0,
  speed = 14,
  onDone,
  highlight = [],
}: {
  text: string;
  delay?: number;
  speed?: number;
  onDone?: () => void;
  highlight?: string[];
}) {
  const { out, done } = useTypewriter(text, speed, delay);
  useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);

  // apply highlight only when done so typing stays stable
  const render = () => {
    if (!done || highlight.length === 0) return out;
    const parts: (string | React.ReactNode)[] = [out];
    let working: (string | React.ReactNode)[] = parts;
    highlight.forEach((word, hi) => {
      const next: (string | React.ReactNode)[] = [];
      working.forEach((chunk, ci) => {
        if (typeof chunk !== "string") {
          next.push(chunk);
          return;
        }
        const segs = chunk.split(word);
        segs.forEach((s, i) => {
          if (s) next.push(s);
          if (i < segs.length - 1) {
            next.push(
              <span key={`${hi}-${ci}-${i}`} className="text-primary">
                {word}
              </span>,
            );
          }
        });
      });
      working = next;
    });
    return working;
  };

  return (
    <div className="text-foreground/85">
      <span className="select-none text-primary">&gt; </span>
      {render()}
      {!done && <Caret />}
    </div>
  );
}

function SectionHeader({ id, cmd, title }: { id: string; cmd: string; title: string }) {
  return (
    <div id={id} className="mb-8 border-b border-border pb-3">
      <div className="text-xs text-muted-foreground">
        <span className="text-primary">$</span> {cmd}
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="py-12">
      <SectionHeader id="about" cmd="cat about.md" title="about" />
      <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
        <p>
          builder at heart. deep-learning pipelines, real-time web apps, compilers in c —
          i like the parts of software where the abstractions get thin and you have to
          actually understand the machine.
        </p>
        <p className="text-muted-foreground">
          every repo below is well-documented — feel free to dig in.
        </p>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="py-16">
      <SectionHeader id="projects" cmd="ls projects/" title="selected work" />
      <ProjectGroup label="AI" items={ai} />
      <ProjectGroup label="Full-Stack" items={web} />
      <ProjectGroup label="Low-Level" items={lowlevel} />
    </section>
  );
}

function ProjectGroup({ label, items }: { label: string; items: Project[] }) {
  return (
    <div className="mb-14">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="h-px flex-1 bg-border/60" />
      </div>
      <div className="space-y-12">
        {items.map((p) => (
          <ProjectEntry key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="group">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-baseline gap-1.5 font-mono text-lg font-semibold text-foreground transition-colors hover:text-primary"
        >
          {project.name}
          <ArrowUpRight className="h-4 w-4 self-center opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
        {project.status && (
          <span className="font-mono text-xs text-muted-foreground">
            <span className="text-primary/70">(</span>
            {project.status}
            <span className="text-primary/70">)</span>
          </span>
        )}
      </div>

      <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            #{t}
          </span>
        ))}
      </div>

      {project.showcase && <Showcase showcase={project.showcase} repo={project.repo} />}

      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
        >
          <Link className="h-3.5 w-3.5" />
          repository
        </a>
        {project.name === "Aiki" && (
          <a
            href="https://yacine204.github.io/geoGuessr_Assistant/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            wiki view
          </a>
        )}
      </div>
    </article>
  );
}

function Showcase({
  showcase,
  repo,
}: {
  showcase: NonNullable<Project["showcase"]>;
  repo: string;
}) {
  if (showcase.type === "video") {
    return (
      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card/40">
        <video
          src={showcase.url}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-black"
        />
      </div>
    );
  }
  if (showcase.type === "link") {
    return (
      <a
        href={showcase.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center justify-between rounded-lg border border-border bg-card/40 px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <span className="truncate">{showcase.url.replace(/^https?:\/\//, "")}</span>
        <ExternalLink className="h-4 w-4 text-primary" />
      </a>
    );
  }
  return (
    <a
      href={repo}
      target="_blank"
      rel="noreferrer"
      className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary"
    >
      <ExternalLink className="h-3.5 w-3.5" /> {showcase.label ?? "view"}
    </a>
  );
}

function Services() {
  const items = ["Full-stack projects", "Backend services & APIs", "AI / ML prototypes"];
  return (
    <section className="py-16">
      <SectionHeader id="services" cmd="cat services.txt" title="what i can provide" />
      <ul className="grid gap-3 sm:grid-cols-3">
        {items.map((s) => (
          <li
            key={s}
            className="rounded-lg border border-border bg-card/40 px-4 py-5 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <span className="font-mono text-xs text-primary">→ </span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stack() {
  const groups: { label: string; items: string[] }[] = [
    {
      label: "languages",
      items: ["html", "css", "js", "ts", "python", "java", "go", "c", "c++", "assembly"],
    },
    { label: "frameworks", items: ["django", "fastapi", "nestjs", "express"] },
    {
      label: "libraries",
      items: ["react", "three.js", "numpy", "ultralytics", "pandas", "pytorch", "sklearn"],
    },
  ];
  return (
    <section className="py-16">
      <SectionHeader id="stack" cmd="which --all" title="what i use" />
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <div className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {g.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="rounded-md border border-border bg-card/40 px-2 py-1 font-mono text-xs text-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    {
      label: "yacinebenarousi@gmail.com",
      href: "mailto:yacinebenarousi@gmail.com",
      icon: Mail,
    },
    {
      label: "linkedin.com/in/yacine-benaroussi",
      href: "https://www.linkedin.com/in/yacine-benaroussi-b0b62536b",
      icon: UserCircle,
    },
    {
      label: "github.com/yacine204",
      href: "https://github.com/yacine204",
      icon: Link,
    },
    {
      label: "instagram.com/yv_cin3",
      href: "https://www.instagram.com/yv_cin3/",
      icon: Globe,
    },
  ];
  return (
    <section className="py-16">
      <SectionHeader id="contact" cmd="contact --help" title="get in touch" />
      <p className="mb-8 max-w-xl text-muted-foreground">
        Got a project, an idea, or just want to talk shop? My inbox is open.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center justify-between rounded-lg border border-border bg-card/40 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-card"
          >
            <span className="flex items-center gap-3 font-mono text-sm">
              <l.icon className="h-4 w-4 text-primary" />
              {l.label}
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-2 px-6 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Yacine Benaroussi</span>
        <span>Crafted in Oran · always learning</span>
      </div>
    </footer>
  );
}
