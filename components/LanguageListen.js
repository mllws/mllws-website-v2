"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { voiceMessages, clickGreetings } from "@/lib/data";

const PARALLAX_POSITIONS = [
  { left: 4, top: 6, size: 26, rot: -6 },
  { left: 92, top: 8, size: 22, rot: 5 },
  { left: 3, top: 92, size: 24, rot: -4 },
  { left: 94, top: 90, size: 20, rot: 6 },
  { left: 2, top: 40, size: 20, rot: -3 },
  { left: 95, top: 35, size: 22, rot: 4 },
  { left: 6, top: 70, size: 18, rot: -5 },
  { left: 90, top: 65, size: 20, rot: 3 },
  { left: 3, top: 20, size: 18, rot: -6 },
  { left: 93, top: 18, size: 20, rot: 5 },
];

export default function LanguageListen() {
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [pops, setPops] = useState([]);
  const [popSeq, setPopSeq] = useState(0);

  useEffect(() => {
    setVoiceIndex(Math.floor(Math.random() * voiceMessages.length));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const vm = voiceMessages[voiceIndex];
    const id = setInterval(() => {
      setPlayedSeconds((s) => {
        const next = s + 0.2;
        if (next >= vm.duration) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [playing, voiceIndex]);

  const vm = voiceMessages[voiceIndex];
  const pct = playing ? Math.min(100, (playedSeconds / vm.duration) * 100) : 0;

  function handleSectionClick(e) {
    if (e.target.closest("button, a, input")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const text = clickGreetings[Math.floor(Math.random() * clickGreetings.length)];
    const id = popSeq + 1;
    setPopSeq(id);
    setPops((prev) => [...prev, { id, x, y, text }]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 1400);
  }

  function shuffleVoice() {
    setPlaying(false);
    setPlayedSeconds(0);
    setVoiceIndex((current) => {
      let next;
      do {
        next = Math.floor(Math.random() * voiceMessages.length);
      } while (next === current && voiceMessages.length > 1);
      return next;
    });
  }

  return (
    <section
      aria-labelledby="listen-heading"
      className="relative isolate overflow-hidden bg-brand px-6 py-28 sm:px-12"
      onClick={handleSectionClick}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARALLAX_POSITIONS.map((p, i) => (
          <span
            key={i}
            className="font-display absolute whitespace-nowrap font-extrabold text-white opacity-[0.08]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              fontSize: `${p.size}px`,
              transform: `translateY(${scrollY * 0.06}px) rotate(${p.rot}deg)`,
            }}
          >
            {clickGreetings[i % clickGreetings.length]}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[100px] -right-[60px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(179,69,47,0.22),transparent_70%)]"
      />

      {pops.map((pop) => (
        <span
          key={pop.id}
          aria-hidden="true"
          className="animate-pop-float font-display pointer-events-none absolute z-5 text-[28px] font-extrabold text-[#D9A441]"
          style={{ left: pop.x, top: pop.y }}
        >
          {pop.text}
        </span>
      ))}

      <div className="pointer-events-none relative mx-auto max-w-[720px] text-center">
        <span className="mb-5 inline-block rounded-full bg-white/12 px-4 py-1.5 text-[13px] font-bold text-white">
          Hear it in your language
        </span>
        <h2 id="listen-heading" className="sr-only">
          Hear greetings in your language
        </h2>
        <p className="mb-8 text-[17px] text-[#D6E6F2]">
          Short greetings from languages celebrated by our community. Tap anywhere for a surprise
          greeting.
        </p>

        <div className="pointer-events-auto flex items-center gap-5 rounded-3xl bg-white/8 p-8 text-left">
          <button
            type="button"
            aria-label={playing ? "Pause greeting" : "Play greeting"}
            onClick={() => {
              if (playing) {
                setPlaying(false);
                setPlayedSeconds(0);
              } else {
                setPlaying(true);
              }
            }}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-0 text-[15px] ${
              playing ? "bg-accent text-white" : "bg-white text-brand"
            }`}
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          </button>
          <div className="min-w-0 flex-1">
            <div className="font-display mb-0.5 text-lg font-bold text-white">
              {vm.language} · {vm.greeting}
            </div>
            <div className="mb-2.5 text-sm text-[#D6E6F2]">
              {vm.name}, {vm.role}
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full bg-accent transition-[width] duration-200 linear"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto mt-6 flex flex-wrap justify-center gap-3.5">
          <button
            type="button"
            onClick={shuffleVoice}
            className="rounded-full border-0 bg-white/12 px-[22px] py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Another language
          </button>
          <Link
            href="/membership"
            className="rounded-full bg-white px-[22px] py-3 text-sm font-bold text-brand no-underline transition hover:scale-105 hover:text-brand"
          >
            Add your language
          </Link>
        </div>
      </div>
    </section>
  );
}
